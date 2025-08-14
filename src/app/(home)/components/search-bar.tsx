"use client";

import { SearchIcon } from "@/assets/img/search-icon";
import { XIcon } from "@/assets/img/x-icon";
import { TAG } from "@/hooks/usePagination";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { Form, Formik } from "formik";
import { useState } from "react";

interface SearchBarProps {
  handleSaveTickets: (data: GetAllTicketsData[]) => void;
  handleSaveTotalRows: (total: number) => void;
  handleResetPagination: () => void;
  handleSetQuery: (query: string) => void;
  handleChangeTag: (tag: TAG) => void;
}

export default function SearchBar({
  handleResetPagination,
  handleChangeTag,
  handleSetQuery,
}: SearchBarProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const initialValues = {
    search: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    handleResetPagination();
    handleSetQuery(values.search);
  };

  const handleVerifyIsCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 11) {
      handleChangeTag("cpf");
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    handleChangeTag("name");
    return value;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, submitForm, setValues }) => (
        <Form noValidate className="w-full sm:w-auto">
          <label className="input input-bordered flex items-center gap-2 w-full sm:w-[420px] h-12">
            <SearchIcon className="size-5 opacity-60" />
            <input
              placeholder="Pesquise por nome ou CPF"
              name="search"
              onChange={(e) => {
                if (timer) clearTimeout(timer);

                const updatedValue = handleVerifyIsCPF(e.currentTarget.value);
                e.currentTarget.value = updatedValue;
                handleChange(e);

                const newTimer = setTimeout(() => submitForm(), 1500);
                setTimer(newTimer);
              }}
              value={values.search}
              type="text"
              className="grow"
            />
            {values.search !== "" && (
              <button
                type="button"
                onClick={() => {
                  setValues({ search: "" });
                  submitForm();
                }}
                className="btn btn-ghost btn-xs"
                aria-label="Limpar busca"
              >
                <XIcon className="size-4" />
              </button>
            )}
          </label>
        </Form>
      )}
    </Formik>
  );
}
