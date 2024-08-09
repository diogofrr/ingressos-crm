import { AuthConsts } from "@/constants/auth";
import { cookies } from "next/headers";
import { decryptData } from "./decrypt-data";

export async function getJWT() {
  const cookieStore = cookies()

  const jwt = cookieStore.get(AuthConsts.SESSION)

  if (jwt?.value) {
    const decryptedJWT = await decryptData(jwt.value)

    return {
      jwt: decryptedJWT
    }
  }

  return null
}