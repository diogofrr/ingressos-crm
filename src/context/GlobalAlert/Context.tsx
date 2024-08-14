import { createContext } from "react"
import { InitialState } from "./data"
import { ShowMessageArgs } from "@/types/global-message"

interface Context {
  state: InitialState
  hideMessage: () => void
  showMessage: (payload: ShowMessageArgs) => void
}

export const Context = createContext<Context | null>(null)