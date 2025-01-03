"use client";

import { PlusIcon } from "@/assets/img/plus-icon";
import useModal from "@/hooks/useModal";
import AddUserModal from "./add-user-modal";
import { SHOW_MESSAGE_FN } from "@/types/global-message";

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
        className="py-2 px-3 h-12 bg-blue-500 rounded-xl flex items-center justify-center w-full sm:w-auto md:w-64"
      >
        <PlusIcon className="size-6 text-white mr-2 sm:mr-0 md:mr-2" />
        <span className="text-white block sm:hidden md:block">
          Adicionar ingresso
        </span>
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
