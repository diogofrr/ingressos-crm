import { AlertIcon } from "@/assets/img/alert-icon"
import { CheckIcon } from "@/assets/img/check-icon"
import { DangerIcon } from "@/assets/img/danger-icon"
import { InfoIcon } from "@/assets/img/info-icon"
import { XIcon } from "@/assets/img/x-icon"
import { ALERT_TYPE } from "@/types/global-message"

interface AlertProps {
  children: React.ReactNode
  type: ALERT_TYPE
  visible: boolean
  className?: string
  handleHideMessage?: () => void
  autoClose?: number
  floating?: boolean
}

export default function Alert({ children, type, visible, className, handleHideMessage, autoClose, floating }: AlertProps) {
  const alertStyle = {
    danger: "bg-red-50 text-sm text-red-600 border-l-red-600",
    success: "bg-green-50 text-sm text-green-600 border-l-green-600",
    warning: "bg-yellow-50 text-sm text-yellow-600 border-l-yellow-600",
    info: "bg-blue-50 text-sm text-blue-600 border-l-blue-600",
  }

  const title = {
    danger: "Erro",
    success: "Sucesso",
    warning: "Aviso",
    info: "Informativo"
  }

  const icon = {
    danger: <DangerIcon className="size-8" />,
    success: <CheckIcon className="size-8" />,
    warning: <AlertIcon className="size-8" />,
    info: <InfoIcon className="size-8" />
  }

  if (autoClose && handleHideMessage) {
    setTimeout(() => {
      handleHideMessage?.()
    }, autoClose)
  }

  return (
    <div className={`mt-2 h-auto ${className} ${alertStyle[type]} ${!visible ? 'hidden' : 'flex'} items-start px-2 py-4 border-l-[6px] gap-2 shadow-sm transition-all rounded-md ${floating && 'absolute rounded-none sm:rounded-md mt-0 sm:mt-2 top-0 sm:top-4 left-2/4 -translate-x-2/4 w-dvw sm:w-[400px]'}`} role="alert" tabIndex={-1}>
      <div>
        {icon[type]}
      </div>
      <div>
        <p className="font-bold">{title[type]}</p>
        <p>
          {children}
        </p>
      </div>
      {handleHideMessage && (
        <button className="ml-auto hover:bg-white bg-opacity-40 rounded-full p-1 cursor-pointer" onClick={handleHideMessage}>
          <XIcon className="size-5" />
        </button>
      )}
    </div>
  )
}