/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useAlert from "@/hooks/useAlert";
import useDeviceDetection from "@/hooks/useDeviceDetection";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useLoading from "@/hooks/useLoading";
import usePagination from "@/hooks/usePagination";
import { getAllTickets } from "@/services/tickets/get-all-tickets";
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { useCallback, useEffect, useState } from "react";
import AddUserButton from "./components/add-user/add-user-btn";
import CardList from "./components/card-pagination/card-list";
import EmptyList from "./components/empty-list";
import Header from "./components/header";
import InfiniteScroll from "./components/infinite-scroll/infinite-scroll";
import Pagination from "./components/pagination";
import QRCodeButton from "./components/qrcode/qrcode-button";
import SearchBar from "./components/search-bar";
import TicketTable from "./components/ticket-table/ticket-table";
import TicketTableSkeleton from "./components/ticket-table/ticket-table-skeleton";

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
  const {
    page: infinitePage,
    hasMore,
    isLoading: infiniteLoading,
    allTickets,
    resetInfiniteScroll,
    addTickets,
    setInitialTickets,
    setIsLoading: setInfiniteLoading,
  } = useInfiniteScroll();

  const handleSaveTickets = (tickets: GetAllTicketsData[]) =>
    setTickets(tickets);

  const handleLoadMoreTickets = useCallback(async () => {
    if (infiniteLoading || !hasMore) return;

    setInfiniteLoading(true);

    const startRow = (infinitePage - 1) * 10;
    const endRow = startRow + 10;

    await getAllTickets({
      start_row: startRow,
      end_row: endRow,
      tag,
      query,
    })
      .then((data) => {
        if (!data.result || data.error) {
          handleShowMessage(data.msg, "danger");
          return;
        }

        addTickets(data.result.tickets, data.result.total);
      })
      .catch((e) => {
        console.error(e.message);
        setInfiniteLoading(false);
      });
  }, [
    infinitePage,
    infiniteLoading,
    hasMore,
    tag,
    query,
    addTickets,
    handleShowMessage,
  ]);

  const handleGetTickets = useCallback(async () => {
    if (!tickets) {
      handleStartLoading();
      handleHideMessage();
    }

    await getAllTickets({
      start_row: startRow,
      end_row: endRow,
      tag,
      query,
    })
      .then((data) => {
        if (!data.result || data.error) {
          handleShowMessage(data.msg, "danger");
          return;
        }

        setTickets(data.result.tickets);
        handleSaveTotalRows(data.result.total);

        if (device !== "Desktop") {
          setInitialTickets(data.result.tickets, data.result.total);
        }
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => {
        handleStopLoading();
      });
  }, [startRow, endRow, query, device, setInitialTickets]);

  useEffect(() => {
    handleGetTickets();
  }, [handleGetTickets]);

  const Cards = () => {
    if (loading) return <TicketTableSkeleton />;

    return tickets && tickets.length > 0 ? (
      <>
        <InfiniteScroll
          onLoadMore={handleLoadMoreTickets}
          hasMore={hasMore}
          isLoading={infiniteLoading}
          allTicketsCount={allTickets.length}
        >
          <CardList
            handleShowMessage={handleShowMessage}
            handleGetTickets={handleGetTickets}
            tickets={allTickets.length > 0 ? allTickets : tickets}
          />
        </InfiniteScroll>
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
        <div className="w-full flex-1">
          <TicketTable
            handleShowMessage={handleShowMessage}
            handleGetTickets={handleGetTickets}
            tickets={tickets}
          />
        </div>
      </>
    ) : (
      <EmptyList />
    );
  };

  return (
    <section
      className="flex flex-col h-auto bg-base-200 relative min-h-[800px]"
      id="main-content"
    >
      <Header />
      <section className="sm:min-h-[800px] h-full bg-base-100 flex flex-col scroll-smooth flex-1">
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
            handleResetPagination={() => {
              handleResetPagination();
              resetInfiniteScroll();
            }}
            handleChangeTag={(tag) => {
              handleChangeTag(tag);
              resetInfiniteScroll();
            }}
            handleSetQuery={(query) => {
              handleSetQuery(query);
              resetInfiniteScroll();
            }}
          />
        </div>
        {device !== "Desktop" ? <Cards /> : <Table />}
      </section>
    </section>
  );
}
