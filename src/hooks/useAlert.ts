"use client";

import { ALERT_TYPE } from "@/types/global-message";
import { toast } from "sonner";

export default function useAlert() {
  const handleShowMessage = (message: string, type: ALERT_TYPE) => {
    const normalized = type === "danger" ? "error" : type;
    if (normalized === "success") toast.success(message);
    else if (normalized === "error") toast.error(message);
    else if (normalized === "warning") toast.warning(message);
    else toast.info(message);
  };

  const handleHideMessage = () => toast.dismiss();

  return {
    handleShowMessage,
    handleHideMessage,
    visible: false,
    message: "",
    type: "info" as ALERT_TYPE,
  };
}
