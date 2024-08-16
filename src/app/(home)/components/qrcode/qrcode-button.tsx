import Button from "@/app/components/button";
import useModal from "@/hooks/useModal";
import QRCodeModal from "./qrcode-modal";
import { QRCodeIcon } from "@/assets/img/qrcode-icon";
import { SHOW_MESSAGE_FN } from "@/types/global-message";

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
        className="block sm:hidden"
      >
        <QRCodeIcon className="size-6 mr-2" />
        Ler QRCode
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
