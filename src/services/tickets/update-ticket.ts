'use server'

import { UpdateTicketResponse } from "@/types/tickets/update-ticket";
import { getJWT } from "../auth/get-jwt";

interface UpdateTicketArgs {
  id: number
  full_name: string
  telephone: string
  birth_date: string
  cpf: string
}

export async function updateTicket(ticketData: UpdateTicketArgs) {
  const token = await getJWT()
  if (!token) throw new Error('Sessão expirada.')

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token.jwt}`)

  const body = JSON.stringify(ticketData)

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: headers,
    body,
    redirect: 'follow',
    cache: 'reload'
  };

  const data = await fetch(`${process.env.API_URL}/ticket`, requestOptions)
  const parsedData: UpdateTicketResponse = await data.json()

  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.msgUser
}