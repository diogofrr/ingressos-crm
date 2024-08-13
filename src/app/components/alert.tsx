import { AlertIcon } from "@/assets/img/alert-icon"
import { CheckIcon } from "@/assets/img/check-icon"
import { DangerIcon } from "@/assets/img/danger-icon"
import { InfoIcon } from "@/assets/img/info-icon"
import { ALERT_TYPE } from "@/hooks/useAlert"

interface AlertProps {
  children: React.ReactNode
  type: ALERT_TYPE
  visible: boolean
  className?: string
}

export default function Alert({ children, type, visible, className }: AlertProps) {
  const alertStyle = {
    danger: "bg-red-100 border border-red-200 text-sm text-red-950 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500",
    success: "bg-green-100 border border-green-200 text-sm text-green-800 rounded-lg p-4 dark:bg-green-800/10 dark:border-green-900 dark:text-green-500",
    warning: "bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500",
    info: "bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500",
  }

  const icon = {
    danger: <DangerIcon className="size-4" />,
    success: <CheckIcon className="size-4" />,
    warning: <AlertIcon className="size-4" />,
    info: <InfoIcon className="size-4" />
  }

  return (
    <div className={`mt-2 ${className} ${alertStyle[type]} ${!visible ? 'hidden' : 'flex'} items-center start gap-2`} role="alert" tabIndex={-1}>
      <div>
        {icon[type]}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}