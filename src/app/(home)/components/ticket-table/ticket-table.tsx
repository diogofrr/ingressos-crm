import { DownloadIcon } from "@/assets/img/download-icon";
import { EditIcon } from "@/assets/img/edit-icon";
import { getTicket } from "@/services/tickets/get-ticket";
import {
  GetAllTicketsData,
} from "@/types/tickets/get-all-tickets";
import useModal from "@/hooks/useModal";
import EditUserModal from "../edit-user/edit-user-modal";
import { useState } from "react";
import StatusCircle from "@/app/components/status-circle";
import useLoading from "@/hooks/useLoading";
import { CheckIcon } from "@/assets/img/check-icon";
import Spinner from "@/app/components/spinner";
import { validateTicket } from "@/services/tickets/validate-ticket";
import ModalConfirmation from "@/app/components/modal-confirmation";
import { handleDownloadPdf } from "@/utils/handleDownloadPDF";
import { SHOW_MESSAGE_FN } from "@/types/global-message";

interface TicketTableProps {
  tickets: GetAllTicketsData[];
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN
}

export default function TicketTable({
  tickets,
  handleGetTickets,
  handleShowMessage
}: TicketTableProps) {
  const [selectedItem, setSelectedItem] = useState<GetAllTicketsData>(
    tickets[0]
  );
  const {
    open: openEditModal,
    handleCloseModal: handleCloseEditModal,
    handleOpenModal: handleOpenEditModal,
  } = useModal();
  const {
    open: openVerificationModal,
    handleCloseModal: handleCloseVerificationModal,
    handleOpenModal: handleOpenVerificationModal,
  } = useModal();
  const {
    loading: downloading,
    handleStartLoading: handleStartDownload,
    handleStopLoading: handleStopDownload,
  } = useLoading();
  const {
    loading: verifying,
    handleStartLoading: handleStartVerification,
    handleStopLoading: handleStopVerification,
  } = useLoading();

  const handleDownloadTicket = async (id: string | number) => {
    if (downloading) return;

    handleStartDownload();
    await getTicket({ id })
      .then((ticket) => {
        handleDownloadPdf(ticket)
      })
      .catch((e) => console.log(e))
      .finally(() => handleStopDownload());
  };

  const handleVerifyTicket = async () => {
    if (verifying) return;

    handleStartVerification();
    await validateTicket(selectedItem.qrcode)
      .then(() => {
        handleGetTickets();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        handleStopVerification();
      });
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
          const { id, full_name, cpf, telephone, status, seller, qrcode } =
            data;
          return (
            <tr className="bg-white" key={`${id} + ${full_name} + ${seller}`}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap min-w-64"
              >
                {full_name}
              </th>
              <td className="px-6 py-4 min-w-44">{cpf}</td>
              <td className="px-6 py-4 min-w-44">{telephone}</td>
              <td className="px-6 py-4 min-w-24">
                <StatusCircle status={status} />
              </td>
              <td className="px-6 py-4 min-w-40">{seller}</td>
              <td className="px-6 py-4 text-center min-w-44">
                <div className="flex justify-end gap-4">
                  <button
                    className="hover:bg-slate-200 p-1 rounded-full text-slate-800 hover:text-slate-950"
                    onClick={() => {
                      setSelectedItem(data);
                      handleOpenEditModal();
                    }}
                    disabled={verifying || downloading}
                  >
                    <EditIcon className="size-6 cursor-pointer" />
                  </button>
                  {downloading && selectedItem.id === id ? (
                    <Spinner className="size-6 text-blue-500" />
                  ) : (
                    <button
                      className="hover:bg-blue-200 p-1 rounded-full hover:text-blue-800 text-blue-500"
                      onClick={() => {
                        setSelectedItem(data);
                        handleDownloadTicket(id);
                      }}
                      disabled={verifying || downloading}
                    >
                      <DownloadIcon className="size-6 cursor-pointer" />
                    </button>
                  )}
                  {verifying && selectedItem.id === id ? (
                    <Spinner className="size-6 text-blue-500" />
                  ) : (
                    <button
                      className={`${
                        status !== "A"
                          ? "text-gray-400 cursor-auto"
                          : "hover:bg-green-200 text-green-500 hover:text-green-800"
                      } p-1 rounded-full`}
                      onClick={() => {
                        setSelectedItem(data);
                        handleOpenVerificationModal();
                      }}
                      disabled={status !== "A" || verifying || downloading}
                    >
                      <CheckIcon
                        className={`size-6 ${
                          status !== "A" ? "cursor-auto" : "cursor-pointer"
                        }`}
                      />
                    </button>
                  )}
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
        open={openEditModal}
        handleCloseModal={handleCloseEditModal}
        handleGetTickets={handleGetTickets}
        ticketInfo={selectedItem}
        handleShowMessage={handleShowMessage}
      />
      <ModalConfirmation
        open={openVerificationModal}
        handleCloseModal={handleCloseVerificationModal}
        message="Tem certeza que deseja marcar esse ingresso como utilizado?"
        asyncConfirm={handleVerifyTicket}
      />
    </>
  );
}
