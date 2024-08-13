"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import QRCodeHeader from "./qrcode-header";
import { validateTicket } from "@/services/tickets/validate-ticket";
import useLoading from "@/hooks/useLoading";
import Alert from "@/app/components/alert";
import useAlert from "@/hooks/useAlert";

interface QRCodeModalProps {
  open: boolean;
  handleCloseModal: () => void;
  handleGetTickets: () => void;
}

export default function QRCodeModal({
  open,
  handleCloseModal,
  handleGetTickets
}: QRCodeModalProps) {
  const { loading, handleStartLoading, handleStopLoading } = useLoading();
  const { visible, type, message, handleHideMessage, handleShowMessage } = useAlert()

  const handleValidateQRCode = async (hash: string) => {
    handleStartLoading();
    handleHideMessage();

    await validateTicket(hash)
      .then(() => {
        handleGetTickets()
        handleCloseModal();
      })
      .catch((err) => {
        handleShowMessage(err.message, "danger")
      })
      .finally(() => {
        handleStopLoading();
      });
  };

  if (!open) return;

  return (
    <div className="absolute top-0 left-0 w-full min-h-[800px] h-full z-10 bg-slate-950/20 sm:p-6">
      <div className="relative bg-white w-full sm:w-[600px] h-full sm:h-auto mx-auto top-2/4 -translate-y-2/4 rounded-lg px-6 py-10">
        <QRCodeHeader handleCloseModal={handleCloseModal} />
        <p className="text-sm mt-2">
          Leia o QRCode do ingresso para validação automática do ingresso.
        </p>
        <Alert type={type} visible={visible}>
          {message}
        </Alert>
        <Scanner
          styles={{
            container: {
              marginTop: '24px'
            },
            video: {
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "0.5rem",
            },
          }}
          onScan={async (detectedCodes) => await handleValidateQRCode(detectedCodes[0].rawValue)}
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
    </div>
  );
}
