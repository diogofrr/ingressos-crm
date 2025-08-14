import Button from "@/app/components/button";
import { QRCodeIcon } from "@/assets/img/qrcode-icon";
import useModal from "@/hooks/useModal";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import QRCodeModal from "./qrcode-modal";

interface QRCodeButtonProps {
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function QRCodeButton({
  handleShowMessage,
  handleGetTickets,
}: QRCodeButtonProps) {
  const { open, handleCloseModal, handleOpenModal } = useModal();

  return (
    <>
      <Button
        btnStyle="outline"
        onClick={handleOpenModal}
        className="w-full sm:hidden"
      >
        <div className="flex items-center gap-2">
          <QRCodeIcon className="size-5" />
          <span>Ler QRCode</span>
        </div>
      </Button>
      <QRCodeModal
        handleShowMessage={handleShowMessage}
        open={open}
        handleCloseModal={handleCloseModal}
        handleGetTickets={handleGetTickets}
      />
    </>
  );
}
