import { AuthConsts } from "@/constants/auth";
import { cookies } from "next/headers";
import { decryptData } from "./decrypt-data";

export async function getUserData() {
  const cookieStore = cookies()

  const userData = cookieStore.get(AuthConsts.PROFILE_DATA)

  if (userData) {
    const decryptedUserData = await decryptData(userData.value)

    return {
      userData: decryptedUserData
    }
  }

  return null
}