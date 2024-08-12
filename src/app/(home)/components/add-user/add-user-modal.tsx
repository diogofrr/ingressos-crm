import AddUserForm from "./add-user-form";
import AddUserHeader from "./add-user-header";

interface AddUserModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
}

export default function AddUserModal({ open, handleCloseModal, handleGetTickets }: AddUserModalProps) {
  if (!open) return;

  return (
    <div className="absolute top-0 left-0 w-full min-h-[800px] h-full z-10 bg-slate-950/20 sm:p-6">
      <div className="relative bg-white w-full sm:w-[600px] h-full sm:h-auto mx-auto top-2/4 -translate-y-2/4 rounded-lg px-6 py-10">
        <AddUserHeader handleCloseModal={handleCloseModal} />
        <AddUserForm handleCloseModal={handleCloseModal} handleGetTickets={handleGetTickets} />
      </div>
    </div>
  );
}
