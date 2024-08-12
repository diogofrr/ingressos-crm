import { useState } from "react";

export default function usePagination() {
  const [startRow, setStartRow] = useState(0)
  const [endRow, setEndRow] = useState(10)
  const [totalRows, setTotalRows] = useState(0)

  const handleNextPage = () => {
    if (endRow >= totalRows) return
    setStartRow(startRow + 10)
    setEndRow(endRow + 10)
  }

  const handlePreviousPage = () => {
    if (startRow === 0 && endRow === 10) return
    setStartRow(startRow - 10)
    setEndRow(endRow - 10)
  }

  const handleResetPagination = () => {
    setStartRow(0)
    setEndRow(10)
  }

  const handleSaveTotalRows = (totalRows: number) => {
    setTotalRows(totalRows)
  }

  return {
    startRow,
    endRow,
    totalRows,
    handleNextPage,
    handlePreviousPage,
    handleResetPagination,
    handleSaveTotalRows
  }
}