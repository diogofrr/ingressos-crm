"use client";

import { useEffect, useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    width: 0,
    height: 0,
  });
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setElement(document.getElementById("cards-content"));
    }
  }, []);

  const handleOpenModal = () => {
    if (element) {
      element.style.overflow = "hidden";
    }

    if (typeof window !== "undefined") {
      setPosition({
        height: window.scrollY,
        width: window.screenX,
      });
      window.scrollTo(0, 0);
    }
    setOpen(true);
  };

  const handleCloseModal = () => {
    if (element) {
      element.style.overflow = "auto";
    }

    if (typeof window !== "undefined") {
      window.scrollTo(position.width, position.height);
    }
    setOpen(false);
  };

  return {
    open,
    handleOpenModal,
    handleCloseModal,
  };
}
