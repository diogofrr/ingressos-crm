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
    tag,
    query,
    startRow,
    endRow,
    totalRows,
    handleSetQuery,
    handleChangeTag,
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
      tag,
      query
    })
    .then((data) => {
        if (!data.result || data.error) {
          handleShowMessage(data.msg, 'danger')
          return
        }

        setTickets(data.result.tickets);
        handleSaveTotalRows(data.result.total);
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => {
        handleStopLoading();
      });
  }, [startRow, endRow, query]);

  useEffect(() => {
    handleGetTickets();
  }, [handleGetTickets]);

  const Cards = () => {
    if (loading) return <TicketTableSkeleton />;

    return tickets && tickets.length > 0 ? (
      <>
        <Pagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          totalRows={totalRows}
        />
        <CardList
          handleShowMessage={handleShowMessage}
          handleGetTickets={handleGetTickets}
          tickets={tickets}
        />
      </>
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
    <section className="flex flex-col h-auto sm:h-dvh bg-slate-50 relative min-h-[800px]" id="main-content">
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
      <section className="sm:min-h-[800px] h-full sm:mb-4 mx-0 sm:mx-4 bg-white sm:shadow-lg rounded-lg flex flex-col scroll-smooth">
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
            handleChangeTag={handleChangeTag}
            handleSetQuery={handleSetQuery}
          />
        </div>
        {device !== "Desktop" ? <Cards /> : <Table />}
      </section>
    </section>
  );
}
