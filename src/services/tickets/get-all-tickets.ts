"use server";

import { GetAllTicketsResponse } from "@/types/tickets/get-all-tickets";
import { getJWT } from "../auth/get-jwt";
import { TAG } from "@/hooks/usePagination";
import { ServerActionsResponse } from "@/types/actions";

interface GetAllTicketsArgs {
  start_row: number;
  end_row: number;
  query: string;
  tag: TAG;
}

export async function getAllTickets({
  start_row,
  end_row,
  query,
  tag,
}: GetAllTicketsArgs): Promise<ServerActionsResponse<GetAllTicketsResponse['result'] | null>> {
  const token = await getJWT();

  if (!token) {
    return {
      error: true,
      msg: 'Sessão expirada.',
      result: null
    };
  };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token.jwt}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
    cache: "reload",
  };

  const data = await fetch(
    `${process.env.API_URL}/tickets?start_row=${start_row}&end_row=${end_row}&query=${query}&tag=${tag}`,
    requestOptions
  );
  const parsedData: GetAllTicketsResponse = await data.json();

  if (parsedData.error) {
    return {
      error: true,
      msg: parsedData.msgUser,
      result: null
    };
  };

  return {
    error: false,
    msg: parsedData.msgUser,
    result: parsedData.result
  };
}
