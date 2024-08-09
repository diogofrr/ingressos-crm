import { TicketIcon } from "@/assets/img/ticket-icon";
import LogoutBtn from "./logout-btn";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 h-24">
      <div className="flex items-center rounded-2xl">
        <TicketIcon className="size-12 mr-1 text-red-950"/>
        <span className="font-semibold text-xl">
          Ingressos CRM
        </span>
      </div>
      <LogoutBtn />
    </header>
  )
}