"use client";

import Alert from "@/app/components/alert";
import Button from "@/app/components/button";
import Field from "@/app/components/field";
import { statusLabel } from "@/app/components/status-circle";
import useAlert from "@/hooks/useAlert";
import useLoading from "@/hooks/useLoading";
import { activateTicket } from "@/services/tickets/activate-ticket";
import { cancelTicket } from "@/services/tickets/cancel-ticket";
import { updateTicket } from "@/services/tickets/update-ticket";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { handleFormatCPF } from "@/utils/handleFormatCPF";
import { handleFormatTel } from "@/utils/handleFormatTel";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface EditUserFormProps {
  ticketInfo: GetAllTicketsData;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function EditUserForm({
  ticketInfo,
  handleCloseModal,
  handleGetTickets,
  handleShowMessage,
}: EditUserFormProps) {
  const { loading, handleStartLoading, handleStopLoading } = useLoading();
  const {
    message,
    type,
    visible,
    handleShowMessage: handleShowLocalMessage,
    handleHideMessage,
  } = useAlert();

  const formattedDate = () => {
    const [day, month, year] = ticketInfo.birth_date
      .split("/")
      .map((value) => Number(value));
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  };

  const createdAt = new Date(ticketInfo.created_at).toLocaleDateString("en-CA");

  const initialValues = {
    name: ticketInfo.full_name,
    cpf: ticketInfo.cpf,
    birthday: formattedDate(),
    tel: ticketInfo.telephone,
  };

  const vaidationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório").max(60),
    cpf: Yup.string().required("CPF é obrigatório").length(14, 'CPF inválido'),
    birthday: Yup.date()
      .required("Data de nascimento é obrigatória")
      .min(new Date(1900, 0, 1), "Data de nascimento inválida.")
      .max(new Date(), "Data de nascimento inválida."),
    tel: Yup.string().required("Telefone é obrigatório").length(15, 'Telefone inválido'),
  });

  const handleCancelTicket = async () => {
    await cancelTicket({
      id: ticketInfo.id,
    })
      .then((res) => {
        if (res.error) {
          handleShowLocalMessage(res.msg, "danger")
          return
        }

        handleGetTickets();
        handleShowMessage(res.msg, "success");
        handleCloseModal();
      })
      .catch((e) => console.error(e.message));
  };

  const handleReactivateTicket = async () => {
    await activateTicket({
      id: ticketInfo.id,
    })
      .then((res) => {
        if (res.error) {
          handleShowLocalMessage(res.msg, "danger");
          return
        }

        handleGetTickets();
        handleShowMessage(res.msg, "success");
        handleCloseModal();
      })
      .catch((e) => {
        console.error(e.message)
      });
  };

  const handleSubmit = async (values: typeof initialValues) => {
    handleStartLoading();
    handleHideMessage();

    const formattedObject = {
      id: ticketInfo.id,
      full_name: values.name,
      telephone: values.tel.replace(/\D/g, ""),
      cpf: values.cpf.replace(/\D/g, ""),
      birth_date: new Date(values.birthday).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      }),
    };

    await updateTicket(formattedObject)
      .then((res) => {
        if (res.error) {
          handleShowLocalMessage(res.msg, "danger");
          return
        }

        handleGetTickets();
        handleShowMessage(res.msg, "success");
        handleCloseModal();
      })
      .catch((e) => {
        console.error(e.message)
      })
      .finally(() => handleStopLoading());
  };

  const handleFieldDisabled = () => null;
  const isDisabled = ticketInfo.status !== "A";

  return (
    <Formik
      validationSchema={vaidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleChange }) => (
        <Form className="mt-4 flex flex-col gap-1">
          <Alert type={type} visible={visible}>
            {message}
          </Alert>
          {ticketInfo.status === "C" ? (
            <Button
              color="green"
              btnStyle="outline"
              className="max-w-48 ml-auto"
              onClick={handleReactivateTicket}
            >
              Reativar Ingresso
            </Button>
          ) : (
            <Button
              color={"red"}
              btnStyle="outline"
              className="max-w-48 ml-auto"
              onClick={handleCancelTicket}
              disabled={isDisabled}
            >
              Cancelar Ingresso
            </Button>
          )}

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
            disabled={isDisabled}
            readOnly={isDisabled}
          />
          <div className="flex md:flex-row flex-col md:gap-4">
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
              disabled={isDisabled}
              readOnly={isDisabled}
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
              disabled={isDisabled}
              readOnly={isDisabled}
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
            disabled={isDisabled}
            readOnly={isDisabled}
          />
          <Field
            label="Vendido por"
            name="selledBy"
            error={false}
            type={"text"}
            readOnly
            disabled
            errorMessage={""}
            placeholder={"Nome do vendedor"}
            onChange={handleFieldDisabled}
            value={ticketInfo.seller}
          />
          <div className="flex md:flex-row flex-col md:gap-4">
            <Field
              label="Status"
              name="status"
              error={false}
              type={"text"}
              readOnly
              disabled
              errorMessage={""}
              placeholder={"Status do ingresso"}
              onChange={handleFieldDisabled}
              value={statusLabel[ticketInfo.status]}
            />
            <Field
              label="Criado em"
              name="createdAt"
              error={false}
              type={"date"}
              readOnly
              disabled
              errorMessage={""}
              placeholder={"Data de criação"}
              onChange={handleFieldDisabled}
              value={createdAt}
            />
          </div>
          <Button
            disabled={ticketInfo.status !== "A"}
            type="submit"
            className="mt-6"
            loading={loading}
          >
            Salvar
          </Button>
        </Form>
      )}
    </Formik>
  );
}
