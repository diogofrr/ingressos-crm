/* eslint-disable react-hooks/exhaustive-deps */
import StatusCircle from "@/app/components/status-circle";
import { EllipsisIcon } from "@/assets/img/ellipsis-icon";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { Ref, useState } from "react";
import EditUserModal from "../edit-user/edit-user-modal";
import useModal from "@/hooks/useModal";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import useLoading from "@/hooks/useLoading";
import { getTicket } from "@/services/tickets/get-ticket";
import { handleDownloadPdf } from "@/utils/handleDownloadPDF";

interface CardProps {
  ticket: GetAllTicketsData;
  handleShowMessage: SHOW_MESSAGE_FN;
  handleGetTickets: () => void;
  cardRef?: Ref<any>;
}

export default function Card({
  ticket,
  handleGetTickets,
  handleShowMessage,
  cardRef,
}: CardProps) {
  const [activeOptions, setActiveOptions] = useState(false);
  const { open, handleCloseModal, handleOpenModal } = useModal();
  const {
    loading: downloading,
    handleStartLoading: handleStartDownload,
    handleStopLoading: handleStopDownload,
  } = useLoading();

  const handleDownloadTicket = async () => {
    setActiveOptions(false);
    if (downloading) return;

    handleStartDownload();
    await getTicket({ id: ticket.id })
      .then((ticket) => {
        handleDownloadPdf(ticket);
      })
      .catch((e) => {
        handleShowMessage(e.message, "danger");
      })
      .finally(() => handleStopDownload());
  };

  return (
    <>
      <EditUserModal
        open={open}
        handleCloseModal={handleCloseModal}
        handleGetTickets={handleGetTickets}
        ticketInfo={ticket}
        handleShowMessage={handleShowMessage}
      />
      <div
        className="w-full py-4 px-4 flex justify-between items-center border-2 rounded-lg bg-slate-50"
        ref={cardRef}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{ticket.full_name}</p>
            <StatusCircle hideLabel status={ticket.status} />
          </div>
          <p>{ticket.cpf}</p>
        </div>
        <div
          className={`border-2 rounded-full p-1 relative ${
            activeOptions ? "border-black" : "border-transparent"
          }`}
          onTouchStart={() => setActiveOptions((prevState) => !prevState)}
        >
          <EllipsisIcon className="size-5" />
          <ul
            className={`${
              activeOptions ? "block" : "hidden"
            } absolute shadow-lg bg-white p-2 w-52 -right-full top-8 z-10`}
          >
            <li>
              <button
                className="p-2 hover:bg-slate-50"
                onTouchEnd={handleDownloadTicket}
              >
                Baixar ingresso
              </button>
            </li>
            <li>
              <button
                className="p-2"
                onTouchEnd={() => {
                  setActiveOptions(false);
                  handleOpenModal();
                }}
              >
                Editar ingresso
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
