import Button from "@/app/components/button"
import useModal from "@/hooks/useModal"
import QRCodeModal from "./qrcode-modal"
import { QRCodeIcon } from "@/assets/img/qrcode-icon"

interface QRCodeButtonProps {
  handleGetTickets: () => void
}

export default function QRCodeButton({ handleGetTickets }: QRCodeButtonProps) {
  const { open, handleCloseModal, handleOpenModal } = useModal()

  return (
    <>
      <Button btnStyle="outline" onClick={handleOpenModal} className="block sm:hidden">
        <QRCodeIcon className="size-6 mr-2" />
        Ler QRCode
      </Button>
      <QRCodeModal open={open} handleCloseModal={handleCloseModal} handleGetTickets={handleGetTickets} />
    </>
  )
}