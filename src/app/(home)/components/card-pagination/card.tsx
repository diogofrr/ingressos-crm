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

        const filename = res.result.ticket.full_name;

        return buildTicketPdf({
          ticket: {
            full_name: res.result.ticket.full_name,
            cpf: res.result.ticket.cpf,
            telephone: res.result.ticket.telephone,
            qrcode: res.result.ticket.qrcode,
          },
          event: {
            ...res.result.event,
            batch: res.result.ticket.batch, // Usa o batch do ticket
          },
        }).then((dataUrl) => handleDownloadPdf(dataUrl, filename));
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
      <div className="card bg-base-100 shadow-sm rounded-none">
        <div className="card-body py-4 px-4">
          <div className="flex items-start justify-between gap-2">
            <div
              className="flex flex-col gap-1 w-full"
              onClick={handleCloseOptions}
            >
              <div className="flex items-center gap-2">
                <StatusCircle hideLabel status={ticket.status} />
                <p className="font-semibold">{ticket.full_name}</p>
              </div>
              <p className="text-sm opacity-70">{ticket.cpf}</p>
            </div>
            <div
              className={`dropdown dropdown-end ${
                activeOptions && selectedCard === String(ticket.id)
                  ? "dropdown-open"
                  : ""
              }`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost btn-sm rounded-full ${
                  activeOptions && selectedCard === String(ticket.id)
                    ? "btn-active"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenOptions(String(ticket.id));
                }}
              >
                <EllipsisIcon className="size-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] w-56 p-3 shadow"
              >
                <li>
                  <button
                    className="justify-between py-3 px-4 text-base font-medium hover:bg-base-200 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDownloadTicket();
                      handleCloseOptions();
                      const dropdown = e.currentTarget.closest(
                        ".dropdown"
                      ) as HTMLElement | null;
                      const trigger = dropdown?.querySelector(
                        '[role="button"]'
                      ) as HTMLElement | null;
                      trigger?.blur();
                      dropdown?.classList.remove("dropdown-open");
                    }}
                  >
                    Baixar ingresso
                  </button>
                </li>
                <li>
                  <button
                    className="py-3 px-4 text-base font-medium hover:bg-base-200 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCloseOptions();
                      handleOpenModal();
                      const dropdown = e.currentTarget.closest(
                        ".dropdown"
                      ) as HTMLElement | null;
                      const trigger = dropdown?.querySelector(
                        '[role="button"]'
                      ) as HTMLElement | null;
                      trigger?.blur();
                      dropdown?.classList.remove("dropdown-open");
                    }}
                  >
                    Editar ingresso
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
