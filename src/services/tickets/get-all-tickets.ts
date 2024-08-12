'use server'

import { GetAllTicketsResponse } from "@/types/tickets/get-all-tickets";
import { getJWT } from "../auth/get-jwt";

interface GetAllTicketsProps {
  start_row: number;
  end_row: number;
}

export async function getAllTickets({ start_row, end_row }: GetAllTicketsProps) {
  const token = await getJWT()
  
  if (!token) throw new Error('Token not found')

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token.jwt}`)

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
    cache: 'reload'
  };

  const data = await fetch(`${process.env.API_URL}/tickets?start_row=${start_row}&end_row=${end_row}`, requestOptions)
  const parsedData: GetAllTicketsResponse = await data.json()
  
  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.result
}