'use client'

import { Context } from "@/context/GlobalAlert/Context"
import { ALERT_TYPE } from "@/types/global-message"
import { useContext } from "react"

export default function useGlobalAlert() {
  const context = useContext(Context)

  if (!context) {
    throw new Error("useGlobalAlert must be used within a AlertProvider")
  }

  const handleShowMessage = (message: string, type: ALERT_TYPE) => {
    context.showMessage({
      message,
      type
    })
  }

  const handleHideMessage = () => {
    context.hideMessage()
  }

  return {
    ...context.state,
    handleShowMessage,
    handleHideMessage,
  }
}