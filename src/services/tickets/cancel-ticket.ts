'use server'

import { CancelTicketResponse } from "@/types/tickets/cancel-ticket";
import { getJWT } from "../auth/get-jwt";

interface CancelTicketArgs {
  id: string | number;
}

export async function cancelTicket({ id }: CancelTicketArgs) {
  const token = await getJWT()
  
  if (!token) throw new Error('Sessão expirada.')

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

  const data = await fetch(`${process.env.API_URL}/del-ticket`, requestOptions)
  const parsedData: CancelTicketResponse = await data.json()

  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.msgUser
}