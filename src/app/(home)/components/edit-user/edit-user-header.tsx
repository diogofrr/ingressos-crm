"use client";

import { CloseIcon } from "@/assets/img/close-icon";

interface EditUserHeaderProps {
  handleCloseModal: () => void;
}

export default function EditUserHeader({
  handleCloseModal,
}: EditUserHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-lg sm:text-xl font-semibold">Editar Ingresso</h2>
      <button
        className="btn btn-ghost btn-sm sm:btn-md"
        onClick={handleCloseModal}
        aria-label="Fechar"
      >
        <CloseIcon className="size-4 sm:size-5" />
      </button>
    </header>
  );
}
