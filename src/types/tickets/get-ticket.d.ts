import { ResponseDTO } from "../response";

export interface TicketDTO {
  id?: string;
  seller_id?: string;
  full_name: string;
  telephone: string;
  birth_date?: string;
  cpf: string;
  qrcode: string;
  status: "A" | "U" | "C";
}

export interface EventDTO {
  title: string;
  date: string;
  time: string;
  addressLine1: string;
  addressLine2: string;
  batch: number;
}

export interface TicketWithEvent {
  ticket: TicketDTO;
  event: EventDTO;
}

export interface GetTicketResponse extends ResponseDTO {
  result: TicketWithEvent;
}
