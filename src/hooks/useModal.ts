import { useState } from "react";

export default function useLoading() {
  const [open, setOpen] = useState(false)

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  return {
    open,
    handleOpenModal,
    handleCloseModal
  }
}