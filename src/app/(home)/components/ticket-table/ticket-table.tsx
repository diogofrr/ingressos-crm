import { DownloadIcon } from "@/assets/img/download-icon";
import { EditIcon } from "@/assets/img/edit-icon";
import { getTicket } from "@/services/tickets/get-ticket";
import {
  GetAllTicketsData,
  TICKET_STATUS,
} from "@/types/tickets/get-all-tickets";
import useModal from "@/hooks/useModal";
import EditUserModal from "../edit-user/edit-user-modal";
import { useState } from "react";
import StatusCircle from "@/app/components/statusCircle";
import useLoading from "@/hooks/useLoading";

interface TicketTableProps {
  tickets: GetAllTicketsData[];
  handleGetTickets: () => void;
}

export default function TicketTable({
  tickets,
  handleGetTickets,
}: TicketTableProps) {
  const [selectedItem, setSelectedItem] = useState<GetAllTicketsData>(
    tickets[0]
  );
  const { open, handleCloseModal, handleOpenModal } = useModal();
  const { loading, handleStartLoading, handleStopLoading } = useLoading()

  const handleDownloadTicket = async (id: string | number) => {
    if (loading) return;

    handleStartLoading();
    await getTicket({ id })
      .then((ticket) => {
        const link = document.createElement("a");
        link.href = ticket;
        link.download = `ingresso-crm.pdf`;
        link.click();
      })
      .catch((e) => console.log(e))
      .finally(() => handleStopLoading());
  };

  const TableHeader = () => {
    return (
      <thead className="text-xs text-gray-900 uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nome
          </th>
          <th scope="col" className="px-6 py-3">
            CPF
          </th>
          <th scope="col" className="px-6 py-3">
            Telefone
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Vendido por
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return (
      <tbody>
        {tickets.map((data) => {
          const { id, full_name, cpf, telephone, status, seller } = data;
          return (
            <tr className="bg-white" key={`${id} + ${full_name} + ${seller}`}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap min-w-64"
              >
                {full_name}
              </th>
              <td className="px-6 py-4 min-w-40">{cpf}</td>
              <td className="px-6 py-4 min-w-40">{telephone}</td>
              <td className="px-6 py-4 min-w-24">
                <StatusCircle status={status} />
              </td>
              <td className="px-6 py-4 min-w-40">{seller}</td>
              <td className="px-6 py-4 text-center min-w-32">
                <div className="flex justify-end gap-4">
                  <button
                    className="hover:bg-slate-200 p-1 rounded-full"
                    onClick={() => {
                      setSelectedItem(data);
                      handleOpenModal();
                    }}
                  >
                    <EditIcon className="size-6 text-slate-500 cursor-pointer hover:text-slate-800" />
                  </button>
                  <button
                    className="hover:bg-slate-200 p-1 rounded-full"
                    onClick={() => handleDownloadTicket(id)}
                  >
                    <DownloadIcon className="size-6 text-slate-500 cursor-pointer hover:text-slate-800" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <TableHeader />
          <TableBody />
        </table>
      </div>
      <EditUserModal
        handleCloseModal={handleCloseModal}
        open={true}
        handleGetTickets={handleGetTickets}
        ticketInfo={selectedItem}
      />
    </>
  );
}
