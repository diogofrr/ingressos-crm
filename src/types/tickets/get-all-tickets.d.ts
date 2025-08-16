import { ResponseDTO } from "../response";

export type TICKET_STATUS = "A" | "U" | "C";

export interface GetAllTicketsData {
  id: string;
  seller_id: number;
  seller: {
    full_name: string;
  };
  full_name: string;
  telephone: string;
  birth_date: string;
  cpf: string;
  qrcode: string;
  status: TICKET_STATUS;
  batch: number;
  created_at: string;
  update_at: string | null;
  update_by: string | null;
}

export interface GetAllTicketsResponse extends ResponseDTO {
  result: {
    total: number;
    tickets: GetAllTicketsData[];
  };
}
