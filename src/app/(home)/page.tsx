"use client";

import Header from "./components/header";
import Pagination from "./components/pagination";
import EmptyList from "./components/empty-list";
import AddUserButton from "./components/add-user/add-user-btn";
import SearchBar from "./components/search-bar";
import TicketTable from "./components/ticket-table/ticket-table";
import { useCallback, useEffect, useState } from "react";
import { getAllTickets } from "@/services/tickets/get-all-tickets";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import useLoading from "@/hooks/useLoading";
import TicketTableSkeleton from "./components/ticket-table/ticket-table-skeleton";
import usePagination from "@/hooks/usePagination";
import QRCodeButton from "./components/qrcode/qrcode-button";

export default function Home() {
  const [tickets, setTickets] = useState<GetAllTicketsData[] | null>(null);
  const { loading, handleStartLoading, handleStopLoading } = useLoading(true);
  const {
    totalRows,
    startRow,
    endRow,
    handleNextPage,
    handlePreviousPage,
    handleSaveTotalRows,
  } = usePagination();

  const handleGetTickets = useCallback(async () => {
    if (!tickets) {
      handleStartLoading();
    }
    await getAllTickets({
      start_row: startRow,
      end_row: endRow,
    })
    .then(data => {
      setTickets(data.tickets);
      handleSaveTotalRows(data.total);
    })
    .catch(e => console.log(e))
    .finally((() => {
      handleStopLoading();
    }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRow, endRow]);

  useEffect(() => {
    handleGetTickets();
  }, [handleGetTickets]);

  const Table = () =>
    tickets && tickets.length > 0 ? (
      <>
        <Pagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          totalRows={totalRows}
        />
        <TicketTable handleGetTickets={handleGetTickets} tickets={tickets} />
      </>
    ) : (
      <EmptyList />
    );

  return (
    <section className="flex flex-col h-dvh bg-slate-50 relative min-h-[800px]">
      <Header />
      <section className="min-h-[700px] h-full sm:mb-4 mx-0 sm:mx-4 bg-white shadow-lg rounded-lg flex flex-col">
        <div className="flex items-center justify-between p-4 flex-col sm:flex-row gap-4">
          <AddUserButton handleGetTickets={handleGetTickets} />
          <QRCodeButton handleGetTickets={handleGetTickets} />
          <SearchBar disabled={tickets?.length === 0} />
        </div>
        {loading ? <TicketTableSkeleton /> : <Table />}
      </section>
    </section>
  );
}
