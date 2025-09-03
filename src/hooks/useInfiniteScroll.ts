import { GetAllTicketsData } from "@/types/tickets/get-all-tickets";
import { useCallback, useState } from "react";

export default function useInfiniteScroll() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [allTickets, setAllTickets] = useState<GetAllTicketsData[]>([]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
  }, [isLoading, hasMore]);

  const resetInfiniteScroll = useCallback(() => {
    setPage(1);
    setHasMore(true);
    setAllTickets([]);
  }, []);

  const addTickets = useCallback(
    (newTickets: GetAllTicketsData[], total: number) => {
      setAllTickets((prev) => [...prev, ...newTickets]);

      const currentTotal = allTickets.length + newTickets.length;
      setHasMore(currentTotal < total);

      if (hasMore) {
        setPage((prev) => prev + 1);
      }

      setIsLoading(false);
    },
    [allTickets.length, hasMore]
  );

  const setInitialTickets = useCallback(
    (tickets: GetAllTicketsData[], total: number) => {
      setAllTickets(tickets);
      setHasMore(tickets.length < total);
      setPage(2);
      setIsLoading(false);
    },
    []
  );

  return {
    page,
    hasMore,
    isLoading,
    allTickets,
    loadMore,
    resetInfiniteScroll,
    addTickets,
    setInitialTickets,
    setIsLoading,
  };
}
