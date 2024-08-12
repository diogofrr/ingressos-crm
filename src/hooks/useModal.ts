import { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return {
    open,
    handleOpenModal,
    handleCloseModal,
  };
}
