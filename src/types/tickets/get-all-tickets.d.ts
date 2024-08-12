import { ResponseDTO } from "../response";

export type TICKET_STATUS =  "A" | "U" | "C"

export interface GetAllTicketsData {
  id: number
  seller_id: number
  seller: string
  full_name: string
  telephone: string
  birth_date: string
  cpf: string
  qrcode: string
  status: TICKET_STATUS
  created_at: string
  update_at: string | null
  update_by: string | null
}

export interface GetAllTicketsResponse extends ResponseDTO {
 result: {
  total: number,
  tickets: GetAllTicketsData[]
 };
}