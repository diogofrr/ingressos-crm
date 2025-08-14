"use client";

import { LogoutIcon } from "@/assets/img/logout-icon";
import { logout } from "@/services/auth/logout";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  const handleLogout = async () =>
    await logout()
      .then(() => router.replace("/auth/login"))
      .catch((e) => console.log(e));

  return (
    <button className="btn btn-ghost" onClick={handleLogout} aria-label="Sair">
      <LogoutIcon className="size-5 mr-1" />
      Sair
    </button>
  );
}
