import { getAllTickets } from "@/services/tickets/get-all-tickets";
import AddUserButton from "./components/add-user/add-user-btn";
import Header from "./components/header";
import SearchBar from "./components/search-bar";
import TicketTable from "./components/ticket-table/ticket-table";

export default async function Home() {
  const tickets = await getAllTickets()

  return (
    <section className="flex flex-col h-dvh bg-slate-50 relative min-h-[800px]">
      <Header />
      <section className="min-h-[700px] h-full sm:mb-4 mx-0 sm:mx-4 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between p-4 flex-col sm:flex-row gap-4">
          <AddUserButton />
          <SearchBar />
        </div>
        <TicketTable tickets={tickets} />
      </section>
    </section>
  )
}
