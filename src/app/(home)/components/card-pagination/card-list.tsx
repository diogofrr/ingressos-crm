import { GetAllTicketsData } from "@/types/tickets/get-all-tickets"
import Card from "./card"

interface CardListProps {
  tickets: GetAllTicketsData[]
}

export default function CardList({ tickets }: CardListProps) {
 return (
  <div className="h-full mx-4 flex flex-col gap-4">
    {tickets.map((ticket) => {
      return <Card key={ticket.id} ticket={ticket} />
    })}
  </div>
 )
}