import StatusCircle from "@/app/components/status-circle";
import { EllipsisIcon } from "@/assets/img/ellipsis-icon";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";

interface CardProps {
  ticket: GetAllTicketsData
}

export default function Card({ ticket }: CardProps) {
  return (
    <div className="w-full py-2 px-4 flex justify-between items-center border-2 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p>{ticket.full_name}</p>
          <StatusCircle hideLabel status={ticket.status} />
        </div>
        <p>{ticket.cpf}</p>
      </div>
      <div className="">
        <EllipsisIcon className="size-5" />
      </div>
    </div>
  )
}