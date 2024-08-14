"use server";

import { SearchTicketsResponse } from "@/types/tickets/search-tickets";
import { getJWT } from "../auth/get-jwt";

interface SearchTicketsArgs {
  type: "cpf" | "name";
  value: string;
}

export async function searchTickets(args: SearchTicketsArgs) {
  const token = await getJWT();
  if (!token) throw new Error("Token not found");

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token.jwt}`)

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
    cache: "reload",
  };

  const data = await fetch(`${process.env.API_URL}/search?query=${args.value}&tag=${args.type}`, requestOptions);
  const parsedData: SearchTicketsResponse = await data.json();

  if (parsedData.error) throw new Error(parsedData.msgUser);

  return parsedData;
}
