"use server";

import { ServerActionsResponse } from "@/types/actions";
import { ValidateTicketResponse } from "@/types/tickets/validate-ticket";
import { getJWT } from "../auth/get-jwt";

export async function validateTicket(
  hash: string
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

  const body = JSON.stringify({
    hash,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body,
    redirect: "follow",
    cache: "reload",
  };

  const data = await fetch(
    `${process.env.API_URL}/tickets/validate`,
    requestOptions
  );
  const parsedData: ValidateTicketResponse = await data.json();

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
