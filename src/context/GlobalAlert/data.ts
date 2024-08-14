import { ALERT_TYPE } from "@/types/global-message"

export const initialState: InitialState = {
  type: 'info',
  message: '',
  visible: false
}

export interface InitialState {
  type: ALERT_TYPE
  visible: boolean
  message: string
}
