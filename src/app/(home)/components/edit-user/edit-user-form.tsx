"use client";

import Field from "@/app/components/field";
import Select from "@/app/components/select";
import { statusLabel } from "@/app/components/status-circle";
import useAlert from "@/hooks/useAlert";
import useLoading from "@/hooks/useLoading";
import { activateTicket } from "@/services/tickets/activate-ticket";
import { cancelTicket } from "@/services/tickets/cancel-ticket";
import { getTicket } from "@/services/tickets/get-ticket";
import { updateTicket } from "@/services/tickets/update-ticket";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { buildTicketPdf } from "@/utils/buildTicketPdf";
import { handleDeepEqual } from "@/utils/handleDeepEqual";
import { handleDownloadPdf } from "@/utils/handleDownloadPDF";
import { handleFormatCPF } from "@/utils/handleFormatCPF";
import { handleFormatTel } from "@/utils/handleFormatTel";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface EditUserFormProps {
  ticketInfo: GetAllTicketsData;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
  onSubmitForm?: (submitFn: () => void) => void;
  onCancelAction?: (cancelFn: () => void) => void;
  onFormValidation?: (isValid: boolean) => void;
}

export default function EditUserForm({
  ticketInfo,
  handleCloseModal,
  handleGetTickets,
  handleShowMessage,
  onSubmitForm,
  onCancelAction,
  onFormValidation,
}: EditUserFormProps) {
  const { handleStartLoading, handleStopLoading } = useLoading();
  const { handleShowMessage: handleShowLocalMessage, handleHideMessage } =
    useAlert();
  const [showDetails, setShowDetails] = useState(false);

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
    batch: ticketInfo.batch?.toString() || "1",
  };

  const vaidationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório").max(60),
    cpf: Yup.string().required("CPF é obrigatório").length(14, "CPF inválido"),
    birthday: Yup.date()
      .required("Data de nascimento é obrigatória")
      .min(new Date(1900, 0, 1), "Data de nascimento inválida.")
      .max(new Date(), "Data de nascimento inválida."),
    tel: Yup.string()
      .required("Telefone é obrigatório")
      .length(15, "Telefone inválido"),
    batch: Yup.string().required("Lote é obrigatório"),
  });

  const handleCancelTicket = async () => {
    await cancelTicket({
      id: ticketInfo.id,
    })
      .then((res) => {
        if (res.error) {
          handleShowLocalMessage(res.msg, "danger");
          return;
        }

        handleGetTickets();
        handleCloseModal();
        handleShowMessage(res.msg, "success");
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
          return;
        }

        handleGetTickets();
        handleCloseModal();
        handleShowMessage(res.msg, "success");
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const createCancelAction = () => {
    if (ticketInfo.status === "C") {
      return handleReactivateTicket;
    } else {
      return handleCancelTicket;
    }
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
      batch: Number(values.batch),
    };

    await updateTicket(formattedObject)
      .then(async (res) => {
        if (res.error) {
          handleShowLocalMessage(res.msg, "danger");
          return;
        }

        try {
          const ticketData = await getTicket({ id: ticketInfo.id });
          if (ticketData.result) {
            await buildTicketPdf({
              ticket: ticketData.result.ticket,
              event: {
                ...ticketData.result.event,
                batch: ticketData.result.ticket.batch,
              },
            }).then((dataUrl) => {
              handleDownloadPdf(dataUrl);
            });
          }
        } catch (error) {
          console.error("Erro ao gerar PDF:", error);
        }

        handleGetTickets();
        handleCloseModal();
        handleShowMessage(res.msg, "success");
      })
      .catch((e) => {
        console.error(e.message);
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
      {({ values, errors, handleChange, submitForm, isValid }) => {
        // Expõe as funções para o modal
        if (onSubmitForm) {
          onSubmitForm(submitForm);
        }

        if (onCancelAction) {
          onCancelAction(createCancelAction());
        }

        if (onFormValidation) {
          const hasChanges = !handleDeepEqual(values, initialValues);
          const canSave = isValid && hasChanges && ticketInfo.status === "A";
          onFormValidation(canSave);
        }

        return (
          <div className="flex flex-col h-full">
            <Form className="flex flex-col space-y-3 xs:space-y-4 sm:space-y-6 flex-1 pr-1 sm:pr-2">
              {/* Campos principais */}
              <div className="space-y-3 xs:space-y-4 sm:space-y-6">
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
                <div className="flex flex-col lg:flex-row lg:gap-4 gap-3 xs:gap-4 sm:gap-6">
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
                  disabled={isDisabled}
                  required
                />
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
              </div>

              {/* Toggle para detalhes */}
              <div className="border-t border-base-200 pt-3 xs:pt-4">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="btn btn-ghost btn-sm w-full justify-between"
                >
                  <span className="text-sm font-medium">Ver mais detalhes</span>
                  <span
                    className={`transition-transform duration-200 ${
                      showDetails ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
              </div>

              {/* Campos de detalhes (condicionais) */}
              {showDetails && (
                <div className="space-y-3 xs:space-y-4 sm:space-y-6 border-t border-base-200 pt-3 xs:pt-4">
                  <div className="flex flex-col lg:flex-row lg:gap-4 gap-3 xs:gap-4 sm:gap-6">
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
                      value={ticketInfo.seller.full_name}
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
                </div>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
