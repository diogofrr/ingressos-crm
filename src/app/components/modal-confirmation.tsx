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
        base: "fixed inset-0 bg-base-100 xs:bg-transparent xs:flex xs:items-center xs:justify-center p-3 xs:p-4",
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
      <div className="w-full h-full xs:bg-base-100 xs:rounded-xl xs:max-w-md xs:w-11/12 xs:h-auto flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center text-center gap-4 xs:gap-6 p-4 xs:p-6">
          <AlertIcon className="size-12 xs:size-16 text-warning" />
          <div className="space-y-2 xs:space-y-3">
            <h3 className="text-base xs:text-lg font-semibold">Atenção</h3>
            <p className="text-sm xs:text-base leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 p-4 xs:p-6 pt-0 xs:pt-6">
          <Button
            type="button"
            btnStyle="outline"
            color="secondary"
            onClick={handleCloseModal}
            disabled={loading}
            fullWidth={true}
            className="order-2 flex-auto xs:order-1 h-12 min-h-12 xs:h-14 xs:min-h-14 text-sm xs:text-base"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            btnStyle="solid"
            color="blue"
            onClick={handleConfirm}
            disabled={loading}
            loading={loading}
            fullWidth={true}
            className="order-1 flex-auto xs:order-2 h-12 min-h-12 xs:h-14 xs:min-h-14 text-sm xs:text-base"
          >
            {loading ? "Carregando..." : "Confirmar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
