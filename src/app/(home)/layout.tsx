import { redirect } from "next/navigation"
import { verifyHasSession } from "@/services/auth/verify-has-session"

interface HomeLayoutProps {
  children: React.ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const hasSession = await verifyHasSession()

  if (!hasSession) redirect('/auth/login')

  return children
}