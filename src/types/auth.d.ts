import { ResponseDTO } from "./response"

export interface LoginResponse extends ResponseDTO {
  nome: string
  jwt: string
}