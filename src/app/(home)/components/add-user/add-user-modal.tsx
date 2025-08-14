"use client";

import { SHOW_MESSAGE_FN } from "@/types/global-message";
import Modal from "react-modal";
import AddUserForm from "./add-user-form";
import AddUserHeader from "./add-user-header";

interface AddUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function AddUserModal({
  open,
  handleCloseModal,
  handleGetTickets,
  handleShowMessage,
}: AddUserModalProps) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={handleCloseModal}
      className={{
        base: "fixed inset-0 bg-base-100 sm:bg-transparent sm:flex sm:items-center sm:justify-center",
        afterOpen: "",
        beforeClose: "",
      }}
      overlayClassName={{
        base: "fixed inset-0 z-50 bg-transparent sm:bg-black/50",
        afterOpen: "",
        beforeClose: "",
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="w-full h-full overflow-auto p-6 sm:bg-base-100 sm:rounded-xl sm:max-w-2xl sm:w-11/12 sm:h-auto sm:p-6 space-y-1">
        <AddUserHeader handleCloseModal={handleCloseModal} />
        <AddUserForm
          handleShowMessage={handleShowMessage}
          handleCloseModal={handleCloseModal}
          handleGetTickets={handleGetTickets}
        />
      </div>
    </Modal>
  );
}
