import { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    width: 0,
    height: 0
  })
  const element = document.getElementById("cards-content");

  const handleOpenModal = () => {
    if (element) {
      element.style.overflow = "hidden";
    }

    setPosition({
      height: window.scrollY,
      width: window.screenX
    })
    window.scrollTo(0, 0)
    setOpen(true)
  };
  const handleCloseModal = () => {
    if (element) {
      element.style.overflow = "auto";
    }

    window.scrollTo(position.width, position.height)
    setOpen(false);
  }

  return {
    open,
    handleOpenModal,
    handleCloseModal,
  };
}
