'use server'

import { cookies } from "next/headers"
import { AuthConsts } from "@/constants/auth"

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete(AuthConsts.SESSION)
  cookieStore.delete(AuthConsts.PROFILE_DATA)
}