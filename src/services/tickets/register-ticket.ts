'use server'

import { getJWT } from "../auth/get-jwt";

interface RegisterTicketArgs {
  full_name: string
  telephone: string
  birth_date: string
  cpf: string
}

export async function registerTicket(ticketData: RegisterTicketArgs) {
  const token = await getJWT()
  if (!token) throw new Error('Token not found')
  
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token.jwt}`)

  const body = JSON.stringify(ticketData)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body,
    redirect: 'follow',
    cache: 'reload'
  };

  const data = await fetch(`${process.env.API_URL}/ticket`, requestOptions)
  const parsedData = await data.json()

  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.result
}