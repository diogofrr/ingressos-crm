import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import Card from "./card";
import { SHOW_MESSAGE_FN } from "@/types/global-message";
import useCard from "@/hooks/useCard";

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
  const cardActions = useCard()

  return (
    <div className="h-full mx-4 flex flex-col gap-4 py-4" id="cards-content">
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
