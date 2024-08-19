'use server'

import { GetTicketResponse } from "@/types/tickets/get-ticket";
import { getJWT } from "../auth/get-jwt";
import { ServerActionsResponse } from "@/types/actions";

interface GetTicketArgs {
  id: string | number;
}

export async function getTicket({ id }: GetTicketArgs): Promise<ServerActionsResponse<null | string>> {
  const token = await getJWT()
  
  if (!token) {
    return {
      error: true,
      msg: 'Sessão expirada.',
      result: null
    };
  };

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token.jwt}`)

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
    cache: 'reload'
  };

  const data = await fetch(`${process.env.API_URL}/ticket?id=${id}`, requestOptions)
  const parsedData: GetTicketResponse = await data.json()

  if (parsedData.error) {
    return {
      error: true,
      msg: parsedData.msgUser,
      result: null
    };
  }

  return {
    error: false,
    msg: parsedData.msgUser,
    result: parsedData.pdf
  };
}