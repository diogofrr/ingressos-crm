"use client";

import { ArrowLeftIcon } from "@/assets/img/arrow-left-icon";
import { ArrowRightIcon } from "@/assets/img/arrow-right-icon";

interface PaginationProps {
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  totalRows: number;
}

export default function Pagination({
  handleNextPage,
  handlePreviousPage,
  totalRows,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between sm:justify-center gap-4 mx-4 sm:ml-auto sm:mr-4">
      <p className="text-base-content text-sm">
        <span className="font-semibold">Total de registros:</span> {totalRows}
      </p>
      <div className="join">
        <button
          className="btn btn-sm join-item"
          onClick={handlePreviousPage}
          aria-label="Página anterior"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        <button
          className="btn btn-sm join-item"
          onClick={handleNextPage}
          aria-label="Próxima página"
        >
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
