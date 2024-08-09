import { redirect } from "next/navigation"
import { verifyHasSession } from "@/services/auth/verify-has-session"

interface HomeLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: HomeLayoutProps) {
  const hasSession = await verifyHasSession()

  if (hasSession) redirect('/')

  return children
}