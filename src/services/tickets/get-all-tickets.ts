'use server'

import { GetAllTicketsResponse } from "@/types/tickets/get-all-tickets";
import { getJWT } from "../auth/get-jwt";

export async function getAllTickets() {
  const headers = new Headers()
  const token = await getJWT()

  if (!token) throw new Error('Token not found')

  headers.append('Authorization', `Bearer ${token.jwt}`)

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
    cache: 'reload'
  };

  const data = await fetch(`${process.env.API_URL}/tickets`, requestOptions)
  const parsedData: GetAllTicketsResponse = await data.json()

  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.result
}