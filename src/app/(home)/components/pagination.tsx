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
      <p className="text-slate-950 text-sm">
        <span className="font-semibold">Total de registros:</span> {totalRows}
      </p>
      <div className="flex items-center justify-center gap-2">
        <button
          className="flex items-center justify-center hover:bg-slate-700 bg-slate-500 text-slate-100 rounded-lg px-4 py-2"
          onClick={handlePreviousPage}
          >
          <ArrowLeftIcon className="size-5" />
        </button>
        <button
          className="flex items-center justify-center hover:bg-slate-700 bg-slate-500 text-slate-100 rounded-lg px-4 py-2"
          onClick={handleNextPage}
          >
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
