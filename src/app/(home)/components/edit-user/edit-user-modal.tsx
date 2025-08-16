"use client";

import Button from "@/app/components/button";
import useLoading from "@/hooks/useLoading";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { useRef, useState } from "react";
import Modal from "react-modal";
import EditUserForm from "./edit-user-form";
import EditUserHeader from "./edit-user-header";

interface EditUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
  ticketInfo: GetAllTicketsData;
}

export default function EditUserModal({
  open,
  handleCloseModal,
  handleGetTickets,
  ticketInfo,
  handleShowMessage,
}: EditUserModalProps) {
  const { loading } = useLoading();
  const submitFormRef = useRef<(() => void) | null>(null);
  const cancelActionRef = useRef<(() => void) | null>(null);
  const [canSave, setCanSave] = useState(false);

  const handleSubmitForm = () => {
    if (submitFormRef.current) {
      submitFormRef.current();
    }
  };

  const handleCancelAction = () => {
    if (cancelActionRef.current) {
      cancelActionRef.current();
    }
  };

  const handleSetSubmitForm = (submitFn: () => void) => {
    submitFormRef.current = submitFn;
  };

  const handleSetCancelAction = (cancelFn: () => void) => {
    cancelActionRef.current = cancelFn;
  };

  const handleFormValidation = (isValid: boolean) => {
    setCanSave(isValid);
  };

  const isDisabled = ticketInfo.status !== "A";

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleCloseModal}
      className={{
        base: "fixed inset-0 bg-base-100 xs:bg-transparent xs:flex xs:items-center xs:justify-center p-0 xs:p-2 sm:p-4",
        afterOpen: "",
        beforeClose: "",
      }}
      overlayClassName={{
        base: "fixed inset-0 z-50 bg-transparent xs:bg-black/50",
        afterOpen: "",
        beforeClose: "",
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="w-full h-full xs:bg-base-100 xs:rounded-xl xs:max-w-2xl xs:w-11/12 xs:max-h-[95vh] xs:h-auto sm:max-h-[90vh] flex flex-col">
        {/* Cabeçalho */}
        <div className="p-3 xs:p-4 sm:p-6 pb-2 xs:pb-3 sm:pb-4 border-b border-base-200 flex-shrink-0">
          <EditUserHeader handleCloseModal={handleCloseModal} />
        </div>

        {/* Conteúdo/Formulário */}
        <div className="p-3 xs:p-4 sm:p-6 py-4 xs:py-6 sm:py-8 flex-1 min-h-0 overflow-y-auto">
          <EditUserForm
            handleShowMessage={handleShowMessage}
            handleCloseModal={handleCloseModal}
            handleGetTickets={handleGetTickets}
            ticketInfo={ticketInfo}
            onSubmitForm={handleSetSubmitForm}
            onCancelAction={handleSetCancelAction}
            onFormValidation={handleFormValidation}
          />
        </div>

        {/* Rodapé */}
        <div className="p-3 xs:p-4 sm:p-6 pt-2 xs:pt-3 sm:pt-4 border-t border-base-200 flex flex-col xs:flex-row xs:justify-between gap-2 xs:gap-3 sm:gap-0 flex-shrink-0 bg-base-100">
          <div className="flex justify-center xs:justify-start">
            {ticketInfo.status === "C" ? (
              <Button
                color="green"
                btnStyle="outline"
                onClick={handleCancelAction}
                disabled={loading}
                fullWidth={true}
                className="w-full xs:w-auto xs:min-w-[160px]"
              >
                Reativar Ingresso
              </Button>
            ) : (
              <Button
                color="red"
                btnStyle="outline"
                onClick={handleCancelAction}
                disabled={isDisabled || loading}
                fullWidth={true}
                className="w-full xs:w-auto xs:min-w-[160px]"
              >
                Cancelar Ingresso
              </Button>
            )}
          </div>

          <div className="flex gap-2 sm:gap-3">
            <Button
              type="button"
              btnStyle="outline"
              color="secondary"
              onClick={handleCloseModal}
              disabled={loading}
              fullWidth={true}
              className="flex-1 xs:flex-none xs:w-auto xs:min-w-[100px]"
            >
              Fechar
            </Button>
            <Button
              type="button"
              onClick={handleSubmitForm}
              loading={loading}
              disabled={!canSave}
              fullWidth={true}
              className="flex-1 xs:flex-none xs:w-auto xs:min-w-[100px]"
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
