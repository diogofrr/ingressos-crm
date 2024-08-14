import { ResponseDTO } from "../response";

export interface SearchTicketsResponse extends ResponseDTO {
  result: GetAllTicketsData[]
}