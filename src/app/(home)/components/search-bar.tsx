'use client'

import Button from "@/app/components/button";
import Field from "@/app/components/field";
import { SearchIcon } from "@/assets/img/search-icon";
import { Form, Formik } from "formik";
import { useState } from "react";

type SEARCH_TYPE = 'cpf' | 'name'

export default function SearchBar() {
  const [searchType, setSearchType] = useState<SEARCH_TYPE>('name')

  const initialValues = {
    search: '',
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log({
      ...values,
      searchType
    })
  }

  const handleVerifyIsCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length === 11) {
      setSearchType('cpf')
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    setSearchType('name')
    return value
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
      <Form noValidate className="flex w-full sm:w-auto">
        <Field
          error={false}
          errorMessage=""
          label="Pesquisar"
          placeholder="Pesquise por nome ou CPF"
          name="search"
          onChange={(e) => {
            const updatedValue = handleVerifyIsCPF(e.currentTarget.value)
            e.currentTarget.value = updatedValue
            handleChange(e)
          }}
          value={values.search}
          type="text"
          hideLabel={true}
          className="w-full sm:w-[380px] h-12 rounded-tr-none rounded-br-none"
        />
        <Button className="h-12 rounded-tl-none rounded-bl-none px-4 max-w-14" type="submit">
          <SearchIcon className="size-5" />
        </Button>
      </Form>
  )}
    </Formik>
  );
}
