'use server'

import { cookies } from "next/headers"
import { AuthConsts } from "@/constants/auth"
import { LoginResponse } from "@/types/auth"
import { encryptData } from "./encrypt-data"
import { ServerActionsResponse } from "@/types/actions"

interface LoginArgs {
  email: string
  password: string
}

export async function login(userInfo: LoginArgs): Promise<ServerActionsResponse<string | null>> {
  const cookieStore = cookies()

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(userInfo),
    redirect: 'follow',
    cache: 'no-cache'
  };

  const data = await fetch(`${process.env.API_URL}/login`, requestOptions)
  const parsedData: LoginResponse = await data.json()

  if (parsedData.error) {
    return {
      error: true,
      msg: parsedData.msgUser,
      result: null
    }
  }
    
  cookieStore.set(AuthConsts.SESSION, await encryptData(parsedData.jwt), {
    httpOnly: true,
    secure: process.env.AMBIENT === 'PROD',
    sameSite: 'strict',
    priority: 'high',
  })
  cookieStore.set(AuthConsts.PROFILE_DATA, await encryptData(JSON.stringify(parsedData.nome)), {
    httpOnly: true,
    secure: process.env.AMBIENT === 'PROD',
    sameSite: 'strict',
    priority: 'high',
  })

  if (!cookieStore.has(AuthConsts.SESSION) || !cookieStore.has(AuthConsts.PROFILE_DATA)) {
    return {
      error: true,
      msg: 'Houve um erro ao salvar a sessão. Contate a equipe de desenvolvimento.',
      result: null
    }
  }

  return {
    error: false,
    msg: parsedData.msgUser,
    result: null
  }
}