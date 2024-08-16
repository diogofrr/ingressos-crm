import { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    width: 0,
    height: 0
  })

  const handleOpenModal = () => {
    setPosition({
      height: window.scrollY,
      width: window.screenX
    })
    window.scrollTo(0, 0)
    setOpen(true)
  };
  const handleCloseModal = () => {
    window.scrollTo(position.width, position.height)
    setOpen(false);
  }

  return {
    open,
    handleOpenModal,
    handleCloseModal,
  };
}
