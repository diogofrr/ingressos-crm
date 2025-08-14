import { TicketIcon } from "@/assets/img/ticket-icon";
import LogoutBtn from "./logout-btn";

export default function Header() {
  return (
    <header className="navbar bg-base-100 px-4 h-20 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center">
          <TicketIcon className="size-10 mr-2 text-primary" />
          <span className="font-semibold text-xl">Ingressos CRM</span>
        </div>
      </div>
      <div className="flex-none">
        <LogoutBtn />
      </div>
    </header>
  );
}
