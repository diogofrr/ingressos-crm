"use client";

import Alert from "@/app/components/alert";
import Button from "@/app/components/button";
import Field from "@/app/components/field";
import useAlert from "@/hooks/useAlert";
import useLoading from "@/hooks/useLoading";
import { registerTicket } from "@/services/tickets/register-ticket";
import { handleFormatCPF } from "@/utils/handleFormatCPF";
import { handleFormatTel } from "@/utils/handleFormatTel";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface AddUserFormProps {
  handleCloseModal: () => void;
  handleGetTickets: () => void;
}

export default function AddUserForm({ handleCloseModal, handleGetTickets }: AddUserFormProps) {
  const { loading, handleStartLoading, handleStopLoading } = useLoading()
  const { message, type, visible, handleShowMessage, handleHideMessage } = useAlert()

  const initialValues = {
    name: "",
    cpf: "",
    birthday: "",
    tel: "",
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

  const handleSubmit = async (values: typeof initialValues) => {
    handleStartLoading()
    handleHideMessage()

    const formattedObject = {
      full_name: values.name,
      telephone: values.tel.replace(/\D/g, ''),
      cpf: values.cpf.replace(/\D/g, ''),
      birth_date: new Date(values.birthday).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    await registerTicket(formattedObject)
    .then(() => {
      handleGetTickets()
      handleCloseModal()
    })
    .catch(e => {
      handleShowMessage(e.message, "danger")
    })
    .finally(() => handleStopLoading())
  };

  return (
    <Formik validationSchema={vaidationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, errors, handleChange }) => (
        <Form className="mt-4 flex flex-col gap-1">
          <Alert type={type} visible={visible}>
            {message}
          </Alert>
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
                const value = e.target.value
                const updatedValue = handleFormatCPF(value)

                e.target.value = updatedValue

                handleChange(e)
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
              const value = e.target.value
              const updatedValue = handleFormatTel(value)

              e.target.value = updatedValue

              handleChange(e)
            }}
            value={values.tel}
          />
          <Button type="submit" className="mt-6" loading={loading}>Cadastrar</Button>
        </Form>
      )}
    </Formik>
  );
}
