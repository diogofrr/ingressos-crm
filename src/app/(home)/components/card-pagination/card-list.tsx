import useCard from "@/hooks/useCard";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import Card from "./card";

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
  const cardActions = useCard();

  return (
    <div className="h-full flex flex-col gap-4 py-4" id="cards-content">
      {tickets.map((ticket) => {
        return (
          <Card
            cardActions={cardActions}
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
