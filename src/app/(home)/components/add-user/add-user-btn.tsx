"use client";

import { PlusIcon } from "@/assets/img/plus-icon";
import useModal from "@/hooks/useModal";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import AddUserModal from "./add-user-modal";

interface AddUserButtonProps {
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function AddUserButton({
  handleGetTickets,
  handleShowMessage,
}: AddUserButtonProps) {
  const { open, handleCloseModal, handleOpenModal } = useModal();

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="btn btn-primary h-12 w-full sm:w-auto md:w-64"
      >
        <PlusIcon className="size-5" />
        <span>Adicionar ingresso</span>
      </button>
      <AddUserModal
        handleShowMessage={handleShowMessage}
        handleCloseModal={handleCloseModal}
        open={open}
        handleGetTickets={handleGetTickets}
      />
    </>
  );
}
