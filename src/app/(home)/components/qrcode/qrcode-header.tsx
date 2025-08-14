'use client'

import { CloseIcon } from "@/assets/img/close-icon";

interface QRCodeHeaderProps {
  handleCloseModal: () => void;
}

export default function QRCodeHeader({
  handleCloseModal,
}: QRCodeHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Leitor QRCode</h2>
      <button className="btn btn-ghost btn-sm" onClick={handleCloseModal} aria-label="Fechar">
        <CloseIcon className="size-5" />
      </button>
    </header>
  );
}
