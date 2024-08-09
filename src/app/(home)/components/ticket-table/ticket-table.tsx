import { DownloadIcon } from "@/assets/img/download-icon";
import { EyeIcon } from "@/assets/img/eye-icon";
import {
  GetAllTicketsData,
  TICKET_STATUS,
} from "@/types/tickets/get-all-tickets";

interface TicketTableProps {
  tickets: GetAllTicketsData[];
}

interface StatusCircleProps {
  status: TICKET_STATUS;
}

export default function TicketTable({ tickets }: TicketTableProps) {
  const StatusCircle = ({ status }: StatusCircleProps) => {
    const color = {
      A: "bg-blue-500",
      U: "bg-green-500",
      C: "bg-red-500",
    };

    const statusLabel = {
      A: "Ativo",
      U: "Utilizado",
      C: "Cancelado",
    };

    return (
      <div className="flex items-center">
        <div className={`h-2.5 w-2.5 rounded-full ${color[status]} me-2`}></div>
        <span>{statusLabel[status]}</span>
      </div>
    );
  };

  const TableHeader = () => {
    return (
      <thead className="text-xs text-gray-900 uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nome
          </th>
          <th scope="col" className="px-6 py-3">
            CPF
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Vendido por
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return (
      <tbody>
        {tickets.map(({ id, full_name, cpf, status, seller }) => (
          <tr className="bg-white" key={`${id} + ${full_name} + ${seller}`}>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {full_name}
            </th>
            <td className="px-6 py-4">{cpf}</td>
            <td className="px-6 py-4">
              <StatusCircle status={status} />
            </td>
            <td className="px-6 py-4">{seller}</td>
            <td className="px-6 py-4 text-center">
              <div className="flex justify-end gap-4">
                <span className="hover:bg-slate-200 p-1 rounded-full">
                  <EyeIcon className="size-6 text-slate-500 cursor-pointer hover:text-slate-800" />
                </span>
                <span className="hover:bg-slate-200 p-1 rounded-full">
                  <DownloadIcon className="size-6 text-slate-500 cursor-pointer hover:text-slate-800" />
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <TableHeader />
        <TableBody />
      </table>
    </div>
  );
}
