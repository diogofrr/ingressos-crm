"use client";

import Alert from "@/app/components/alert";
import Button from "@/app/components/button";
import Field from "@/app/components/field";
import { statusLabel } from "@/app/components/statusCircle";
import useAlert from "@/hooks/useAlert";
import useLoading from "@/hooks/useLoading";
import { cancelTicket } from "@/services/tickets/cancel-ticket";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { handleFormatCPF } from "@/utils/handleFormatCPF";
import { handleFormatTel } from "@/utils/handleFormatTel";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface EditUserFormProps {
  ticketInfo: GetAllTicketsData;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
}

export default function EditUserForm({
  ticketInfo,
  handleCloseModal,
  handleGetTickets,
}: EditUserFormProps) {
  const { loading, handleStartLoading, handleStopLoading } = useLoading();
  const { message, type, visible, handleShowMessage, handleHideMessage } =
    useAlert();

  const formattedDate = () => {
    const [day, month, year] = ticketInfo.birth_date
      .split("/")
      .map((value) => Number(value));
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  };

  const initialValues = {
    name: ticketInfo.full_name,
    cpf: ticketInfo.cpf,
    birthday: formattedDate(),
    tel: ticketInfo.telephone,
  };

  const vaidationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório").max(60),
    cpf: Yup.string().required("CPF é obrigatório"),
    birthday: Yup.date()
      .required("Data de nascimento é obrigatória")
      .min(new Date(1900, 0, 1), "Data de nascimento inválida.")
      .max(new Date(), "Data de nascimento inválida."),
    tel: Yup.string().required("Telefone é obrigatório"),
  });

  const handleCancelTicket = async () => {
    await cancelTicket({
      id: ticketInfo.id,
    })
      .then((msg) => {
        handleGetTickets();
        handleCloseModal();
      })
      .catch((e) => console.log(e));
  };

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
    };

    // await registerTicket(formattedObject)
    //   .then(() => {
    //     handleGetTickets();
    //     handleCloseModal();
    //   })
    //   .catch((e) => {
    //     handleShowMessage(e.message, "danger");
    //   })
    //   .finally(() => handleStopLoading());
  };

  const handleFieldDisabled = () => null;

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
          <Button
            color={"red"}
            btnStyle="outline"
            className="max-w-48 ml-auto"
            onClick={handleCancelTicket}
            disabled={ticketInfo.status === "C"}
          >
            Cancelar Ingresso
          </Button>
          <Field
            label="Nome"
            name="name"
            error={Boolean(errors.name)}
            type={"text"}
            errorMessage={errors.name ?? ""}
            placeholder={"Insira o nome do comprador"}
            onChange={handleChange}
            value={values.name}
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
              value={ticketInfo.created_at}
            />
          </div>
          <Button type="submit" className="mt-6" loading={loading}>
            Salvar
          </Button>
        </Form>
      )}
    </Formik>
  );
}
