"use client";

import Button from "@/app/components/button";
import useLoading from "@/hooks/useLoading";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { useRef, useState } from "react";
import Modal from "react-modal";
import AddUserForm from "./add-user-form";
import AddUserHeader from "./add-user-header";

interface AddUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function AddUserModal({
  open,
  handleCloseModal,
  handleGetTickets,
  handleShowMessage,
}: AddUserModalProps) {
  const { loading } = useLoading();
  const submitFormRef = useRef<(() => void) | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmitForm = () => {
    if (submitFormRef.current) {
      submitFormRef.current();
    }
  };

  const handleSetSubmitForm = (submitFn: () => void) => {
    submitFormRef.current = submitFn;
  };

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

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
        <div className="p-6 pb-4 border-b border-base-200">
          <AddUserHeader handleCloseModal={handleCloseModal} />
        </div>

        <div className="p-6 py-8 flex-1 overflow-auto">
          <AddUserForm
            handleShowMessage={handleShowMessage}
            handleCloseModal={handleCloseModal}
            handleGetTickets={handleGetTickets}
            onSubmitForm={handleSetSubmitForm}
            onFormValidation={handleFormValidation}
          />
        </div>

        <div className="p-6 pt-4 border-t border-base-200 flex justify-end gap-3">
          <Button
            type="button"
            btnStyle="outline"
            color="gray"
            onClick={handleCloseModal}
            disabled={loading}
            fullWidth={false}
            className="w-auto min-w-[100px]"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmitForm}
            loading={loading}
            disabled={!isFormValid}
            fullWidth={false}
            className="w-auto min-w-[120px]"
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
