"use client";

import { SearchIcon } from "@/assets/img/search-icon";
import { XIcon } from "@/assets/img/x-icon";
import useLoading from "@/hooks/useLoading";
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
  handleSetQuery
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
      handleChangeTag("cpf")
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    handleChangeTag("name")
    return value;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, submitForm, setValues }) => (
        <Form noValidate className="flex w-full sm:w-auto">
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
            className="outline-none border-2 border-slate-200 focus:border-blue-500 w-full sm:w-[380px] h-12 rounded-lg pl-4 rounded-tr-none rounded-br-none border-r-0 peer"
          />
          <div className="border-slate-200 peer-focus:border-blue-500 py-4 pr-4 border-t-2 border-r-2 border-b-2 rounded-ee-lg rounded-se-lg h-12 flex items-center justify-center text-gray-400 peer-focus:text-blue-500">
            {values.search === "" ? (
              <SearchIcon className="size-5" />
            ) : (
              <button
                onClick={() => {
                  setValues({ search: "" });
                  submitForm();
                }}
                className="hover:bg-blue-500 rounded-full hover:text-white transition"
              >
                <XIcon className="size-5" />
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
