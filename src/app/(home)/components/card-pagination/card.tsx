/* eslint-disable react-hooks/exhaustive-deps */
import StatusCircle from "@/app/components/status-circle";
import { EllipsisIcon } from "@/assets/img/ellipsis-icon";
import { UseCard } from "@/hooks/useCard";
import useLoading from "@/hooks/useLoading";
import useModal from "@/hooks/useModal";
import { getTicket } from "@/services/tickets/get-ticket";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { buildTicketPdf } from "@/utils/buildTicketPdf";
import { handleDownloadPdf } from "@/utils/handleDownloadPDF";
import EditUserModal from "../edit-user/edit-user-modal";

interface CardProps {
  ticket: GetAllTicketsData;
  handleShowMessage: SHOW_MESSAGE_FN;
  handleGetTickets: () => void;
  cardActions: UseCard;
}

export default function Card({
  cardActions,
  ticket,
  handleGetTickets,
  handleShowMessage,
}: CardProps) {
  const { open, handleCloseModal, handleOpenModal } = useModal();
  const { activeOptions, handleCloseOptions, handleOpenOptions, selectedCard } =
    cardActions;
  const {
    loading: downloading,
    handleStartLoading: handleStartDownload,
    handleStopLoading: handleStopDownload,
  } = useLoading();

  const handleDownloadTicket = async () => {
    handleCloseOptions();
    if (downloading) return;

    handleStartDownload();
    await getTicket({ id: ticket.id })
      .then((res) => {
        if (!res.result || res.error) {
          handleShowMessage(res.msg, "danger");
          return;
        }

        return buildTicketPdf({
          ticket: {
            full_name: res.result.ticket.full_name,
            cpf: res.result.ticket.cpf,
            telephone: res.result.ticket.telephone,
            qrcode: res.result.ticket.qrcode,
          },
          event: res.result.event,
        }).then((dataUrl) => handleDownloadPdf(dataUrl));
      })
      .catch((e) => {
        console.error(e.message);
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
      <div className="w-full py-4 px-4 flex justify-between items-center border-2 rounded-lg bg-slate-50">
        <div
          className="flex flex-col gap-2 w-full"
          onClick={handleCloseOptions}
        >
          <div className="flex items-center gap-2">
            <p className="font-semibold">{ticket.full_name}</p>
            <StatusCircle hideLabel status={ticket.status} />
          </div>
          <p>{ticket.cpf}</p>
        </div>
        <div
          className={`border-2 rounded-full p-1 relative ${
            activeOptions && selectedCard === ticket.id
              ? "border-black"
              : "border-transparent"
          }`}
          onTouchStart={() => handleOpenOptions(ticket.id)}
        >
          <EllipsisIcon className="size-5" />
          <ul
            className={`${
              activeOptions && selectedCard === ticket.id ? "block" : "hidden"
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
                  handleCloseOptions();
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
