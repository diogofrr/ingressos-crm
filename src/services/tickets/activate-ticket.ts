'use server'

import { ActivateTicketResponse } from "@/types/tickets/activate-ticket";
import { getJWT } from "../auth/get-jwt";

interface ActivateTicketArgs {
  id: string | number;
}

export async function activateTicket({ id }: ActivateTicketArgs) {
  const token = await getJWT()
  
  if (!token) throw new Error('Token not found')

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
  
  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.msgUser
}