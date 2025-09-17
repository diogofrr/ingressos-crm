"use client";

import ModalConfirmation from "@/app/components/modal-confirmation";
import Spinner from "@/app/components/spinner";
import StatusCircle from "@/app/components/status-circle";
import { CheckIcon } from "@/assets/img/check-icon";
import { DownloadIcon } from "@/assets/img/download-icon";
import { EditIcon } from "@/assets/img/edit-icon";
import { EllipsisIcon } from "@/assets/img/ellipsis-icon";
import { ShareIcon } from "@/assets/img/share-icon";
import useLoading from "@/hooks/useLoading";
import useModal from "@/hooks/useModal";
import { getTicket } from "@/services/tickets/get-ticket";
import { validateTicket } from "@/services/tickets/validate-ticket";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { buildTicketPdf } from "@/utils/buildTicketPdf";
import { handleDownloadPdf } from "@/utils/handleDownloadPDF";
import { handleSharePdf } from "@/utils/handleSharePdf";
import { useState } from "react";
import EditUserModal from "../edit-user/edit-user-modal";

interface TicketTableProps {
  tickets: GetAllTicketsData[];
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function TicketTable({
  tickets,
  handleGetTickets,
  handleShowMessage,
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

  const canNativeShare =
    typeof navigator !== "undefined" &&
    typeof (navigator as any).share === "function";

  const handleDownloadTicket = async (id: string | number) => {
    if (downloading) return;

    handleStartDownload();
    await getTicket({ id })
      .then((res) => {
        if (!res.result || res.error) {
          handleShowMessage(res.msg, "danger");
          return;
        }

        const filename = res.result.ticket.full_name;

        buildTicketPdf({
          ticket: res.result.ticket,
          event: {
            ...res.result.event,
            batch: res.result.ticket.batch,
          },
        }).then((dataUrl) => handleDownloadPdf(dataUrl, filename));
      })
      .catch((e) => console.error(e.message))
      .finally(() => handleStopDownload());
  };

  const handleShareTicket = async (id: string | number) => {
    if (downloading) return;

    handleStartDownload();
    await getTicket({ id })
      .then((res) => {
        if (!res.result || res.error) {
          handleShowMessage(res.msg, "danger");
          return;
        }

        const filename = res.result.ticket.full_name;
        const message = `Segue seu ingresso: ${filename}`;

        buildTicketPdf({
          ticket: res.result.ticket,
          event: {
            ...res.result.event,
            batch: res.result.ticket.batch,
          },
        }).then((dataUrl) => handleSharePdf(dataUrl, filename, message));
      })
      .catch((e) => console.error(e.message))
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
        console.error(err.message);
      })
      .finally(() => {
        handleStopVerification();
      });
  };

  const TableHeader = () => {
    return (
      <thead className="text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-3 w-1/4">
            Nome
          </th>
          <th scope="col" className="px-6 py-3 w-1/6">
            CPF
          </th>
          <th scope="col" className="px-6 py-3 w-1/6">
            Telefone
          </th>
          <th scope="col" className="px-6 py-3 w-1/12">
            Lote
          </th>
          <th scope="col" className="px-6 py-3 w-1/12">
            Status
          </th>
          <th scope="col" className="px-6 py-3 w-1/6">
            Vendido por
          </th>
          <th scope="col" className="px-6 py-3 w-1/6">
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
          const { id, full_name, cpf, telephone, status, seller, batch } = data;
          return (
            <tr
              className="bg-base-100"
              key={`${id} + ${full_name} + ${seller}`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-normal w-1/4"
              >
                {full_name}
              </th>
              <td className="px-6 py-4 w-1/6">{cpf}</td>
              <td className="px-6 py-4 w-1/6">{telephone}</td>
              <td className="px-6 py-4 w-1/12">{batch}ª Lote</td>
              <td className="px-6 py-4 w-1/12">
                <StatusCircle status={status} />
              </td>
              <td className="px-6 py-4 w-1/6">{seller.full_name}</td>
              <td className="px-6 py-4 text-center w-1/6">
                <div className="hidden sm:flex justify-end gap-4">
                  <button
                    className="hover:bg-purple-100 p-2 rounded-full transition-colors duration-200"
                    onClick={() => {
                      setSelectedItem(data);
                      handleOpenEditModal();
                    }}
                    disabled={verifying || downloading}
                  >
                    <EditIcon className="size-6 cursor-pointer text-purple-600" />
                  </button>
                  {downloading && selectedItem.id === id ? (
                    <Spinner className="size-6 text-blue-500" />
                  ) : (
                    <button
                      className="hover:bg-blue-100 p-2 rounded-full transition-colors duration-200"
                      onClick={() => {
                        setSelectedItem(data);
                        handleDownloadTicket(id);
                      }}
                      disabled={verifying || downloading}
                    >
                      <DownloadIcon className="size-6 cursor-pointer text-blue-600" />
                    </button>
                  )}
                  {downloading && selectedItem.id === id ? (
                    <Spinner className="size-6 text-green-500 hidden sm:inline-flex" />
                  ) : (
                    <button
                      className="hover:bg-green-100 p-2 rounded-full transition-colors duration-200 hidden sm:inline-flex"
                      onClick={() => {
                        setSelectedItem(data);
                        handleShareTicket(id);
                      }}
                      aria-label="Compartilhar"
                      title="Compartilhar"
                      disabled={verifying || downloading}
                    >
                      <ShareIcon className="size-6 text-green-600" />
                    </button>
                  )}
                  {verifying && selectedItem.id === id ? (
                    <Spinner className="size-6 text-blue-500" />
                  ) : (
                    <button
                      className={`${
                        status !== "A"
                          ? "text-gray-400 cursor-auto"
                          : "hover:bg-emerald-100 text-emerald-600"
                      } p-2 rounded-full transition-colors duration-200`}
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
                <div className="sm:hidden dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-sm rounded-full"
                  >
                    <EllipsisIcon className="size-5" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] w-48 p-3 shadow"
                  >
                    <li>
                      <button
                        className="py-3 px-4 text-base font-medium hover:bg-base-200 transition-colors duration-200"
                        onClick={(e) => {
                          const dropdown = (
                            e.currentTarget as HTMLElement
                          ).closest(".dropdown") as HTMLElement | null;
                          setSelectedItem(data);
                          handleOpenEditModal();
                          const trigger = dropdown?.querySelector(
                            '[role="button"]'
                          ) as HTMLElement | null;
                          trigger?.blur();
                          dropdown?.classList.remove("dropdown-open");
                        }}
                        disabled={verifying || downloading}
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                        className="py-3 px-4 text-base font-medium hover:bg-base-200 transition-colors duration-200"
                        onClick={(e) => {
                          const dropdown = (
                            e.currentTarget as HTMLElement
                          ).closest(".dropdown") as HTMLElement | null;
                          setSelectedItem(data);
                          handleDownloadTicket(id);
                          const trigger = dropdown?.querySelector(
                            '[role="button"]'
                          ) as HTMLElement | null;
                          trigger?.blur();
                          dropdown?.classList.remove("dropdown-open");
                        }}
                        disabled={verifying || downloading}
                      >
                        Baixar
                      </button>
                    </li>
                    <li className="sm:hidden">
                      <button
                        className="py-3 px-4 text-base font-medium hover:bg-base-200 transition-colors duration-200"
                        onClick={(e) => {
                          const dropdown = (
                            e.currentTarget as HTMLElement
                          ).closest(".dropdown") as HTMLElement | null;
                          setSelectedItem(data);
                          handleShareTicket(id);
                          const trigger = dropdown?.querySelector(
                            '[role="button"]'
                          ) as HTMLElement | null;
                          trigger?.blur();
                          dropdown?.classList.remove("dropdown-open");
                        }}
                        disabled={verifying || downloading}
                      >
                        Compartilhar
                      </button>
                    </li>
                    <li>
                      <button
                        className="py-3 px-4 text-base font-medium hover:bg-base-200 transition-colors duration-200"
                        onClick={(e) => {
                          const dropdown = (
                            e.currentTarget as HTMLElement
                          ).closest(".dropdown") as HTMLElement | null;
                          setSelectedItem(data);
                          handleOpenVerificationModal();
                          const trigger = dropdown?.querySelector(
                            '[role="button"]'
                          ) as HTMLElement | null;
                          trigger?.blur();
                          dropdown?.classList.remove("dropdown-open");
                        }}
                        disabled={status !== "A" || verifying || downloading}
                      >
                        Validar
                      </button>
                    </li>
                  </ul>
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
      <div className="relative overflow-x-auto w-full">
        <table className="table table-zebra w-full text-sm table-fixed h-auto">
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
