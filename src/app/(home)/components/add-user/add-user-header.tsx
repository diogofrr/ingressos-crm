'use client'

import { CloseIcon } from "@/assets/img/close-icon";

interface AddUserHeaderProps {
  handleCloseModal: () => void;
}

export default function AddUserHeader({
  handleCloseModal,
}: AddUserHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Cadastrar Ingresso</h2>
      <button className="btn btn-ghost btn-sm" onClick={handleCloseModal} aria-label="Fechar">
        <CloseIcon className="size-5" />
      </button>
    </header>
  );
}
