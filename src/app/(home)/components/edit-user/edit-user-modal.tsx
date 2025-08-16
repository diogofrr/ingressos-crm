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
        base: "fixed inset-0 bg-base-100 sm:bg-transparent sm:flex sm:items-center sm:justify-center",
        afterOpen: "",
        beforeClose: "",
      }}
      overlayClassName={{
        base: "fixed inset-0 z-50 bg-transparent sm:bg-black/50",
        afterOpen: "",
        beforeClose: "",
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="w-full h-full overflow-auto sm:bg-base-100 sm:rounded-xl sm:max-w-2xl sm:w-11/12 sm:h-auto flex flex-col">
        {/* Cabeçalho */}
        <div className="p-6 pb-4 border-b border-base-200">
          <EditUserHeader handleCloseModal={handleCloseModal} />
        </div>

        {/* Conteúdo/Formulário */}
        <div className="p-6 py-8 flex-1 overflow-auto">
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
        <div className="p-6 pt-4 border-t border-base-200 flex justify-between">
          <div>
            {ticketInfo.status === "C" ? (
              <Button
                color="green"
                btnStyle="outline"
                onClick={handleCancelAction}
                disabled={loading}
                fullWidth={false}
                className="w-auto min-w-[160px]"
              >
                Reativar Ingresso
              </Button>
            ) : (
              <Button
                color="red"
                btnStyle="outline"
                onClick={handleCancelAction}
                disabled={isDisabled || loading}
                fullWidth={false}
                className="w-auto min-w-[160px]"
              >
                Cancelar Ingresso
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              btnStyle="outline"
              color="gray"
              onClick={handleCloseModal}
              disabled={loading}
              fullWidth={false}
              className="w-auto min-w-[100px]"
            >
              Fechar
            </Button>
            <Button
              type="button"
              onClick={handleSubmitForm}
              loading={loading}
              disabled={!canSave}
              fullWidth={false}
              className="w-auto min-w-[100px]"
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
