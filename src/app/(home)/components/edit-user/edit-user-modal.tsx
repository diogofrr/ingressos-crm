import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import EditUserForm from "./edit-user-form";
import EditUserHeader from "./edit-user-header";
import { SHOW_MESSAGE_FN } from "@/types/global-message";

interface EditUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN
  ticketInfo: GetAllTicketsData
}

export default function EditUserModal({ open, handleCloseModal, handleGetTickets, ticketInfo, handleShowMessage }: EditUserModalProps) {
  if (!open) return;

  return (
    <div className="absolute top-0 left-0 w-full min-h-[800px] h-full z-10 bg-slate-950/20 sm:p-6">
      <div className="relative bg-white w-full sm:w-[600px] h-full sm:h-auto mx-auto top-2/4 -translate-y-2/4 rounded-lg px-6 py-10">
        <EditUserHeader handleCloseModal={handleCloseModal} />
        <EditUserForm handleShowMessage={handleShowMessage} handleCloseModal={handleCloseModal} handleGetTickets={handleGetTickets} ticketInfo={ticketInfo} />
      </div>
    </div>
  );
}
