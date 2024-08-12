'use server'

import { getJWT } from "../auth/get-jwt";

interface GetTicketProps {
  id: string | number;
}

export async function getTicket({ id }: GetTicketProps) {
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

  const data = await fetch(`${process.env.API_URL}/ticket?id=${id}`, requestOptions)
  const parsedData = await data.json()
  
  if (parsedData.error) throw new Error(parsedData.msgUser)

  return parsedData.pdf
}