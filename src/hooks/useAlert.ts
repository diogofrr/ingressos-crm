'use client'

import { useState } from "react"

export type ALERT_TYPE = "success" | "danger" | "warning" | "info"

export default function useAlert() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState<ALERT_TYPE>("info")

  const handleShowMessage = (message: string, type: ALERT_TYPE) => {
    setMessage(message)
    setType(type)
    setVisible(true)
  }

  const handleHideMessage = () => {
    setVisible(false)
    setMessage("")
    setType("info")
  }

  return {
    handleShowMessage,
    handleHideMessage,
    visible,
    message,
    type,
  }
}