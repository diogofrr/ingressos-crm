import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import Card from "./card";
import { SHOW_MESSAGE_FN } from "@/types/global-message";

interface CardListProps {
  tickets: GetAllTicketsData[];
  handleGetTickets: () => void;
  handleShowMessage: SHOW_MESSAGE_FN;
}

export default function CardList({
  tickets,
  handleGetTickets,
  handleShowMessage,
}: CardListProps) {

  return (
    <div className="h-full mx-4 flex flex-col gap-4 py-4">
      {tickets.map((ticket) => {
        return (
          <Card
            key={`${ticket.id}-${ticket.qrcode}`}
            ticket={ticket}
            handleGetTickets={handleGetTickets}
            handleShowMessage={handleShowMessage}
          />
        );
      })}
    </div>
  );
}
