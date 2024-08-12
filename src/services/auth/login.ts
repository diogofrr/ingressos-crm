'use server'

import { cookies } from "next/headers"
import { AuthConsts } from "@/constants/auth"
import { LoginResponse } from "@/types/auth"
import { encryptData } from "./encrypt-data"

interface LoginArgs {
  email: string
  password: string
}

export async function login(userInfo: LoginArgs) {
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

  if (parsedData.error) throw new Error(parsedData.msgUser)
    
  cookieStore.set(AuthConsts.SESSION, await encryptData(parsedData.jwt), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
  cookieStore.set(AuthConsts.PROFILE_DATA, await encryptData(JSON.stringify(parsedData.nome)), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  return {
    msg: parsedData.msgUser
  }
}