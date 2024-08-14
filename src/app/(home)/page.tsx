/* eslint-disable react-hooks/exhaustive-deps */
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
import Alert from "../components/alert";
import useAlert from "@/hooks/useAlert";
import useDeviceDetection from "@/hooks/useDeviceDetection";
import CardList from "./components/card-pagination/card-list";

export default function Home() {
  const [tickets, setTickets] = useState<GetAllTicketsData[] | null>(null);
  const { visible, type, message, handleShowMessage, handleHideMessage } =
    useAlert();
  const { loading, handleStartLoading, handleStopLoading } = useLoading(true);
  const {
    totalRows,
    startRow,
    endRow,
    handleNextPage,
    handlePreviousPage,
    handleSaveTotalRows,
    handleResetPagination,
  } = usePagination();
  const device = useDeviceDetection();

  const handleSaveTickets = (tickets: GetAllTicketsData[]) =>
    setTickets(tickets);

  const handleGetTickets = useCallback(async () => {
    if (!tickets) {
      handleStartLoading();
      handleHideMessage();
    }

    await getAllTickets({
      start_row: startRow,
      end_row: endRow,
    })
      .then((data) => {
        setTickets(data.tickets);
        handleSaveTotalRows(data.total);
      })
      .catch((e) => {
        handleShowMessage(e.message, "danger");
      })
      .finally(() => {
        handleStopLoading();
      });
  }, [startRow, endRow]);

  useEffect(() => {
    handleGetTickets();
  }, [handleGetTickets]);

  const Cards = () => {
    if (loading) return <TicketTableSkeleton />;

    return tickets && tickets.length > 0 ? (
      <CardList tickets={tickets} />
    ) : (
      <EmptyList />
    );
  };

  const Table = () => {
    if (loading) return <TicketTableSkeleton />;

    return tickets && tickets.length > 0 ? (
      <>
        <Pagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          totalRows={totalRows}
        />
        <TicketTable
          handleShowMessage={handleShowMessage}
          handleGetTickets={handleGetTickets}
          tickets={tickets}
        />
      </>
    ) : (
      <EmptyList />
    );
  };

  return (
    <section className="flex flex-col h-auto bg-slate-50 relative min-h-[800px]">
      <Alert
        visible={visible}
        type={type}
        handleHideMessage={handleHideMessage}
        autoClose={5000}
        floating
      >
        {message}
      </Alert>
      <Header />
      <section className="min-h-[700px] h-full sm:mb-4 mx-0 sm:mx-4 bg-white shadow-lg rounded-lg flex flex-col">
        <div className="flex items-center justify-between p-4 flex-col sm:flex-row gap-4">
          <AddUserButton
            handleShowMessage={handleShowMessage}
            handleGetTickets={handleGetTickets}
          />
          <QRCodeButton
            handleShowMessage={handleShowMessage}
            handleGetTickets={handleGetTickets}
          />
          <SearchBar
            handleSaveTickets={handleSaveTickets}
            handleSaveTotalRows={handleSaveTotalRows}
            handleResetPagination={handleResetPagination}
          />
        </div>
        {device !== "Desktop" ? <Cards /> : <Table />}
      </section>
    </section>
  );
}
