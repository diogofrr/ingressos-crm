import { SHOW_MESSAGE_FN } from "@/types/global-message";
import AddUserForm from "./add-user-form";
import AddUserHeader from "./add-user-header";
import ReactDOM from "react-dom";

interface AddUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN
}

export default function AddUserModal({
  open,
  handleCloseModal,
  handleGetTickets,
  handleShowMessage
}: AddUserModalProps) {
  if (!open) return;

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 w-full sm:min-h-[800px] h-full z-10 bg-slate-950/20 sm:p-6">
      <div className="fixed sm:relative overflow-auto bg-white w-full sm:w-[600px] h-full sm:h-auto mx-auto top-2/4 -translate-y-2/4 rounded-lg px-6 py-10">
        <AddUserHeader handleCloseModal={handleCloseModal} />
        <AddUserForm
          handleShowMessage={handleShowMessage}
          handleCloseModal={handleCloseModal}
          handleGetTickets={handleGetTickets}
        />
      </div>
    </div>,
    document.body
  );
}
