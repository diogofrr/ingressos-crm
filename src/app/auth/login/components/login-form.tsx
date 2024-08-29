"use client";

import Alert from "@/app/components/alert";
import Button from "@/app/components/button";
import Field from "@/app/components/field";
import useAlert from "@/hooks/useAlert";
import useLoading from "@/hooks/useLoading";
import { login } from "@/services/auth/login";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export const LoginForm = () => {
  const { loading, handleStartLoading, handleStopLoading } = useLoading()
  const { visible, type, message, handleHideMessage, handleShowMessage } = useAlert()

  const initialValues = { email: "", password: "" }

  const validation = Yup.object().shape({
    email: Yup.string().required("Campo obrigatório").email("Digite um email válido"),
    password: Yup.string().required("Campo obrigatório"),
  })

  const handleAuthUser = async (values: typeof initialValues) => {
    handleStartLoading()

    await login(values)
    .then(res => {
      if (res.error) {
        handleShowMessage(res.msg, 'danger')
        return
      }
      handleShowMessage(res.msg, 'success')
    })
    .catch(err => {
      console.log(err.message)
    })
    .finally(() => handleStopLoading())
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={handleAuthUser}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form className="w-full px-8" noValidate>
          <Alert type={type} visible={visible}>
            {message}
          </Alert>
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="Insira seu email aqui"
            value={values.email}
            error={Boolean(errors.email && touched.email && errors.email)}
            errorMessage={errors.email && touched.email ? errors.email : ""}
            onChange={handleChange}
          />
          <Field
            label="Senha"
            name="password"
            type="password"
            value={values.password}
            placeholder="Insira sua senha aqui"
            error={Boolean(errors.password && touched.password && errors.password)}
            errorMessage={errors.password && touched.password ? errors.password : ""}
            onChange={handleChange}
          />
          <Button className="mt-4" type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
