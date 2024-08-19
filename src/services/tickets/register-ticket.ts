"use server";

import { ServerActionsResponse } from "@/types/actions";
import { getJWT } from "../auth/get-jwt";
import { RegisterTicketResponse } from "@/types/tickets/register-ticket";

interface RegisterTicketArgs {
  full_name: string;
  telephone: string;
  birth_date: string;
  cpf: string;
}

export async function registerTicket(ticketData: RegisterTicketArgs): Promise<ServerActionsResponse<null | string>> {
  const token = await getJWT();
  if (!token) {
    return {
      error: true,
      msg: 'Sessão expirada.',
      result: null
    };
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token.jwt}`);

  const body = JSON.stringify(ticketData);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body,
    redirect: "follow",
    cache: "reload",
  };

  const data = await fetch(`${process.env.API_URL}/ticket`, requestOptions);
  const parsedData: RegisterTicketResponse = await data.json();

  if (parsedData.error) {
    return {
      error: true,
      msg: parsedData.msgUser,
      result: null
    };
  }

  return  {
    error: false,
    msg: parsedData.msgUser,
    result: parsedData.pdf
  };
}
