'use server'

import { ActivateTicketResponse } from "@/types/tickets/activate-ticket";
import { getJWT } from "../auth/get-jwt";
import { ServerActionsResponse } from "@/types/actions";

interface ActivateTicketArgs {
  id: string | number;
}

export async function activateTicket({ id }: ActivateTicketArgs): Promise<ServerActionsResponse<null>> {
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
  headers.append('Content-Type', 'application/json')

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ id }),
    redirect: 'follow',
    cache: 'reload'
  };

  const data = await fetch(`${process.env.API_URL}/activate`, requestOptions)
  const parsedData: ActivateTicketResponse = await data.json()
  
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
    result: null
  };
}