export type ALERT_TYPE = "success" | "danger" | "warning" | "info"

export type SHOW_MESSAGE_FN = (message: string, type: ALERT_TYPE) => void

export interface ShowMessageArgs {
  type: ALERT_TYPE;
  message: string;
}