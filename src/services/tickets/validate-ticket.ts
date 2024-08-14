'use server'

import { ValidateTicketResponse } from "@/types/tickets/validate-ticket";
import { getJWT } from "../auth/get-jwt";

export async function validateTicket(hash: string) {
  const token = await getJWT()
  if (!token) throw new Error('Token not found')
  
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token.jwt}`)

  const body = JSON.stringify({
    hash
  })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body,
    redirect: 'follow',
    cache: 'reload'
  };

  const data = await fetch(`${process.env.API_URL}/validate`, requestOptions)
  const parsedData: ValidateTicketResponse = await data.json()

  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.msgUser
}