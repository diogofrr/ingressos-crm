"use client";

import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import Modal from "react-modal";
import EditUserForm from "./edit-user-form";
import EditUserHeader from "./edit-user-header";

interface EditUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
  ticketInfo: GetAllTicketsData;
}

export default function EditUserModal({
  open,
  handleCloseModal,
  handleGetTickets,
  ticketInfo,
  handleShowMessage,
}: EditUserModalProps) {
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
        <EditUserHeader handleCloseModal={handleCloseModal} />
        <EditUserForm
          handleShowMessage={handleShowMessage}
          handleCloseModal={handleCloseModal}
          handleGetTickets={handleGetTickets}
          ticketInfo={ticketInfo}
        />
      </div>
    </Modal>
  );
}
