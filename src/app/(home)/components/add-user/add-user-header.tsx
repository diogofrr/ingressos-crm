'use client'

import { CloseIcon } from "@/assets/img/close-icon";

interface AddUserHeaderProps {
  handleCloseModal: () => void;
}

export default function AddUserHeader({
  handleCloseModal,
}: AddUserHeaderProps) {
  return (
    <header className="text-slate-950 flex items-center justify-between">
      <h2 className="text-2xl font-medium">Cadastrar Ingresso</h2>
      <button
        className="hover:bg-slate-100 p-1 transition-all rounded-full"
        onClick={handleCloseModal}
      >
        <CloseIcon className="size-6 text-slate-950" />
      </button>
    </header>
  );
}
