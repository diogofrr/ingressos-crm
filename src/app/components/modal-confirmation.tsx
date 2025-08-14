"use client";

import { AlertIcon } from "@/assets/img/alert-icon";
import useLoading from "@/hooks/useLoading";
import Modal from "react-modal";
import Button from "./button";

interface ModalConfirmationProps {
  open: boolean;
  message: string;
  handleCloseModal: () => void;
  confirm?: () => void;
  asyncConfirm?: () => Promise<void>;
}

export default function ModalConfirmation({
  message,
  open,
  confirm,
  asyncConfirm,
  handleCloseModal,
}: ModalConfirmationProps) {
  const { loading, handleStartLoading, handleStopLoading } = useLoading();
  const handleConfirm = async () => {
    if (asyncConfirm) {
      handleStartLoading();
      await asyncConfirm().finally(() => handleStopLoading());

      return;
    }

    if (confirm) confirm();
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleCloseModal}
      className={{
        base: "flex items-center justify-center p-4",
        afterOpen: "",
        beforeClose: "",
      }}
      overlayClassName={{
        base: "fixed inset-0 z-50 bg-black/50",
        afterOpen: "",
        beforeClose: "",
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="bg-base-100 rounded-xl p-6 max-w-md w-full h-auto space-y-1">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <AlertIcon className="size-16 text-warning" />
          <h3 className="text-lg font-semibold">Atenção</h3>
          <p>{message}</p>
        </div>
        <div className="modal-action gap-1">
          <Button
            type="button"
            btnStyle="solid"
            color="blue"
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 text-sm"
            fullWidth={false}
          >
            {loading ? "Carregando..." : "Confirmar"}
          </Button>
          <Button
            type="button"
            btnStyle="outline"
            color="red"
            onClick={handleCloseModal}
            disabled={loading}
            className="px-4 text-sm"
            fullWidth={false}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
