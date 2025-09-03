import { useState } from "react";

export type TAG = "name" | "cpf" | "all";

export default function usePagination() {
  const [startRow, setStartRow] = useState(0);
  const [endRow, setEndRow] = useState(10);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<TAG>("all");
  const [totalRows, setTotalRows] = useState(0);

  const handleSetQuery = (query: string) => {
    setQuery(query);
  };

  const handleChangeTag = (tag: TAG) => {
    setTag(tag);
  };

  const handleNextPage = () => {
    if (endRow >= totalRows) return;
    setStartRow(startRow + 10);
    setEndRow(endRow + 10);
  };

  const loadPage = (pageNumber: number) => {
    const start = (pageNumber - 1) * 10;
    const end = start + 10;
    setStartRow(start);
    setEndRow(end);
  };

  const handlePreviousPage = () => {
    if (startRow === 0 && endRow === 10) return;
    setStartRow(startRow - 10);
    setEndRow(endRow - 10);
  };

  const handleResetPagination = () => {
    setStartRow(0);
    setEndRow(10);
  };

  const handleSaveTotalRows = (totalRows: number) => {
    setTotalRows(totalRows);
  };

  return {
    startRow,
    endRow,
    query,
    tag,
    totalRows,
    handleNextPage,
    handlePreviousPage,
    handleResetPagination,
    handleSaveTotalRows,
    handleSetQuery,
    handleChangeTag,
    loadPage,
  };
}
