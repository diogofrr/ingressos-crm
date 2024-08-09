"use client";

import Field from "@/app/components/field";
import { Form, Formik } from "formik";

export default function AddUserForm() {
  const initialValues = {
    name: "",
    cpf: "",
    birthday: "",
    tel: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, errors, handleChange }) => (
        <Form>
          <Field
            label="Nome"
            name="name"
            error={Boolean(errors.name)}
            type={"text"}
            errorMessage={errors.name ?? ""}
            placeholder={"Insira o nome do comprador"}
            onChange={handleChange}
          />
          <Field
            label="CPF"
            name="cpf"
            error={Boolean(errors.cpf)}
            type={"text"}
            errorMessage={errors.cpf ?? ""}
            placeholder={"Insira o CPF do comprador"}
            onChange={handleChange}
          />
          <Field
            label="Data de nascimento"
            name="birthday"
            error={Boolean(errors.birthday)}
            type={"date"}
            errorMessage={errors.birthday ?? ""}
            placeholder={"Insira a data de nascimento do comprador"}
            onChange={handleChange}
          />
          <Field
            label="Telefone"
            name="tel"
            error={Boolean(errors.tel)}
            type={"text"}
            errorMessage={errors.tel ?? ""}
            placeholder={"Insira o telefone do comprador"}
            onChange={handleChange}
          />
        </Form>
      )}
    </Formik>
  );
}
