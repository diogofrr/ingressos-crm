'use server'

import { cookies } from "next/headers"
import { AuthConsts } from "@/constants/auth"

export async function verifyHasSession() {
  const cookieStore = cookies()
  const hasSession = cookieStore.has(AuthConsts.SESSION)
  
  return hasSession
}