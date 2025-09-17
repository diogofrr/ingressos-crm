"use client";

import Field from "@/app/components/field";
import Select from "@/app/components/select";
import useAlert from "@/hooks/useAlert";
import useLoading from "@/hooks/useLoading";
import { registerTicket } from "@/services/tickets/register-ticket";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { buildTicketPdf } from "@/utils/buildTicketPdf";
import { handleDownloadPdf } from "@/utils/handleDownloadPDF";
import { handleFormatCPF } from "@/utils/handleFormatCPF";
import { handleFormatTel } from "@/utils/handleFormatTel";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface AddUserFormProps {
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
  onSubmitForm?: (submitFn: () => void) => void;
  onFormValidation?: (isValid: boolean) => void;
}

export default function AddUserForm({
  handleCloseModal,
  handleGetTickets,
  handleShowMessage,
  onSubmitForm,
  onFormValidation,
}: AddUserFormProps) {
  const { handleStartLoading, handleStopLoading } = useLoading();
  const { handleShowMessage: handleShowLocalMessage, handleHideMessage } =
    useAlert();

  const initialValues = {
    name: "",
    cpf: "",
    birthday: "",
    tel: "",
    batch: "1",
  };

  const vaidationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório").max(60),
    cpf: Yup.string().required("CPF é obrigatório").length(14, "CPF inválido"),
    birthday: Yup.date()
      .required("Data de nascimento é obrigatória")
      .min(new Date(1900, 0, 1), "Data de nascimento inválida")
      .max(new Date(), "Data de nascimento inválida"),
    tel: Yup.string()
      .required("Telefone é obrigatório")
      .length(15, "Telefone inválido"),
    batch: Yup.string().required("Lote é obrigatório"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    handleStartLoading();
    handleHideMessage();

    const formattedObject = {
      full_name: values.name,
      telephone: values.tel.replace(/\D/g, ""),
      cpf: values.cpf.replace(/\D/g, ""),
      birth_date: new Date(values.birthday).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      }),
      batch: Number(values.batch),
    };

    await registerTicket(formattedObject)
      .then((res) => {
        if (!res.result || res.error) {
          handleShowLocalMessage(res.msg, "danger");
          return;
        }

        const name = res.result.ticket.full_name;

        handleGetTickets();
        handleCloseModal();
        return buildTicketPdf({
          ticket: {
            full_name: res.result.ticket.full_name,
            cpf: res.result.ticket.cpf,
            telephone: res.result.ticket.telephone,
            qrcode: res.result.ticket.qrcode,
          },
          event: {
            ...res.result.event,
            batch: res.result.ticket.batch, // Usa o batch do ticket
          },
        }).then((dataUrl) => {
          handleDownloadPdf(dataUrl, name);
          handleShowMessage(res.msg, "success");
        });
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => handleStopLoading());
  };

  return (
    <Formik
      validationSchema={vaidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleChange, submitForm, isValid, dirty }) => {
        if (onSubmitForm) {
          onSubmitForm(submitForm);
        }

        if (onFormValidation) {
          onFormValidation(isValid && dirty);
        }

        return (
          <Form className="flex flex-col space-y-6">
            <Field
              label="Nome"
              name="name"
              error={Boolean(errors.name)}
              type={"text"}
              errorMessage={errors.name ?? ""}
              placeholder={"Insira o nome do comprador"}
              onChange={(e) => {
                const replacedValue = e.target.value.replace(/\d/g, "");
                e.target.value = replacedValue;
                handleChange(e);
              }}
              value={values.name}
            />
            <div className="flex md:flex-row flex-col md:gap-4 gap-6">
              <Field
                label="CPF"
                name="cpf"
                error={Boolean(errors.cpf)}
                type={"text"}
                errorMessage={errors.cpf ?? ""}
                placeholder={"Insira o CPF do comprador"}
                maxLength={14}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedValue = handleFormatCPF(value);

                  e.target.value = updatedValue;

                  handleChange(e);
                }}
                value={values.cpf}
              />
              <Field
                label="Data de nascimento"
                name="birthday"
                error={Boolean(errors.birthday)}
                type={"date"}
                errorMessage={errors.birthday ?? ""}
                placeholder={"Insira a data de nascimento do comprador"}
                onChange={handleChange}
                value={values.birthday}
              />
            </div>
            <Field
              label="Telefone"
              name="tel"
              error={Boolean(errors.tel)}
              type={"text"}
              errorMessage={errors.tel ?? ""}
              placeholder={"Insira o telefone do comprador"}
              maxLength={15}
              onChange={(e) => {
                const value = e.target.value;
                const updatedValue = handleFormatTel(value);

                e.target.value = updatedValue;

                handleChange(e);
              }}
              value={values.tel}
            />
            <Select
              label="Lote"
              name="batch"
              error={Boolean(errors.batch)}
              errorMessage={errors.batch ?? ""}
              options={[
                { key: "1ª Lote", value: 1 },
                { key: "2ª Lote", value: 2 },
                { key: "3ª Lote", value: 3 },
                { key: "4ª Lote", value: 4 },
                { key: "5ª Lote", value: 5 },
              ]}
              onChange={handleChange}
              value={values.batch}
              required
            />
          </Form>
        );
      }}
    </Formik>
  );
}
