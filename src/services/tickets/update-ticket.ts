"use server";

import { ServerActionsResponse } from "@/types/actions";
import { UpdateTicketResponse } from "@/types/tickets/update-ticket";
import { getJWT } from "../auth/get-jwt";

interface UpdateTicketArgs {
  id: string;
  full_name: string;
  telephone: string;
  birth_date: string;
  cpf: string;
  batch: number;
}

export async function updateTicket(
  ticketData: UpdateTicketArgs
): Promise<ServerActionsResponse<null>> {
  const token = await getJWT();
  if (!token) {
    return {
      error: true,
      msg: "Sessão expirada.",
      result: null,
    };
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token.jwt}`);

  const body = JSON.stringify(ticketData);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: headers,
    body,
    redirect: "follow",
    cache: "reload",
  };

  const data = await fetch(
    `${process.env.API_URL}/tickets/${ticketData.id}`,
    requestOptions
  );
  const parsedData: UpdateTicketResponse = await data.json();

  if (parsedData.error) {
    return {
      error: true,
      msg: parsedData.msgUser,
      result: null,
    };
  }

  return {
    error: false,
    msg: parsedData.msgUser,
    result: null,
  };
}
