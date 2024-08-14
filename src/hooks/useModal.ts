import { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    document.body.style.overflow = 'hidden'
    setOpen(true)
  };
  const handleCloseModal = () => {
    document.body.style.overflow = 'unset'
    setOpen(false);
  }

  return {
    open,
    handleOpenModal,
    handleCloseModal,
  };
}
