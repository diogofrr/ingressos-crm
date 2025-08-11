"use client";

import { AlertIcon } from "@/assets/img/alert-icon";
import useLoading from "@/hooks/useLoading";
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
  if (!open) return;

  const handleConfirm = async () => {
    if (asyncConfirm) {
      handleStartLoading();
      await asyncConfirm().finally(() => handleStopLoading());

      return;
    }

    if (confirm) confirm();
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-[800px] h-full z-10 bg-slate-950/20 sm:p-6">
      <div className="relative bg-white max-w-96 h-auto mx-auto top-2/4 -translate-y-2/4 rounded-lg px-6 py-6">
        <div className="flex flex-col items-center justify-center">
          <AlertIcon className="size-20 text-yellow-500" />
          <h3 className="text-xl font-semibold text-slate-950 text-center">
            Atenção
          </h3>
          <p className="text-slate-950 text-center">{message}</p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              type="button"
              btnStyle="solid"
              color="blue"
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 text-sm"
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
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
