import { TICKET_STATUS } from "@/types/tickets/get-all-tickets";

interface StatusCircleProps {
  status: TICKET_STATUS;
  hideLabel?: boolean
}

export const statusLabel = {
  A: "Ativo",
  U: "Utilizado",
  C: "Cancelado",
};

export default function StatusCircle({ status, hideLabel = false }: StatusCircleProps) {
  const color = {
    A: "bg-blue-500",
    U: "bg-green-500",
    C: "bg-red-500",
  };

  return (
    <div className="flex items-center">
      <div className={`h-2.5 w-2.5 rounded-full ${color[status]} me-2`}></div>
      <span className={`${hideLabel ? 'hidden' : 'block'}`}>{statusLabel[status]}</span>
    </div>
  );
}
