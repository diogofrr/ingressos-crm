import { ResponseDTO } from "../response";
import { TicketWithEvent } from "./get-ticket";

export interface RegisterTicketResponse extends ResponseDTO {
  result: TicketWithEvent;
}
