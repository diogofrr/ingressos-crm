"use client";

import Button from "@/app/components/button";
import useAlert from "@/hooks/useAlert";
import useLoading from "@/hooks/useLoading";
import { validateTicket } from "@/services/tickets/validate-ticket";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect } from "react";
import Modal from "react-modal";
import QRCodeHeader from "./qrcode-header";

interface QRCodeModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function QRCodeModal({
  open,
  handleCloseModal,
  handleGetTickets,
  handleShowMessage,
}: QRCodeModalProps) {
  const { loading, handleStartLoading, handleStopLoading } = useLoading();
  const { handleHideMessage, handleShowMessage: handleShowLocalMessage } =
    useAlert();

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  const handleValidateQRCode = async (hash: string) => {
    handleStartLoading();
    handleHideMessage();

    await validateTicket(hash)
      .then((res) => {
        if (res.error) {
          handleShowLocalMessage(res.msg, "danger");
          return;
        }

        handleGetTickets();
        handleCloseModal();
        handleShowMessage(res.msg, "success");
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        handleStopLoading();
      });
  };

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
      <div className="w-full h-full overflow-auto sm:bg-base-100 sm:rounded-xl sm:max-w-2xl sm:w-11/12 sm:h-auto flex flex-col">
        <div className="p-6 pb-4 border-b border-base-200">
          <QRCodeHeader handleCloseModal={handleCloseModal} />
        </div>

        <div className="p-6 py-8 flex-1 overflow-auto">
          <p className="text-sm mb-6 text-gray-600">
            Leia o QRCode do ingresso para validação automática do ingresso.
          </p>
          <Scanner
            styles={{
              container: {
                marginTop: "0",
              },
              video: {
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "0.5rem",
              },
            }}
            onScan={async (detectedCodes) =>
              await handleValidateQRCode(detectedCodes[0].rawValue)
            }
            paused={loading}
            allowMultiple={true}
            components={{
              audio: false,
              onOff: false,
              torch: false,
              zoom: false,
              finder: true,
            }}
            formats={["qr_code", "rm_qr_code", "micro_qr_code"]}
          />
        </div>

        <div className="p-6 pt-4 border-t border-base-200 flex justify-end">
          <Button
            type="button"
            btnStyle="outline"
            color="gray"
            onClick={handleCloseModal}
            disabled={loading}
            fullWidth={false}
            className="w-auto min-w-[100px]"
          >
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
