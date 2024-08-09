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
    <button
      className="flex items-center justify-center py-2 px-4 cursor cursor-pointer rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
      onClick={handleLogout}
    >
      <LogoutIcon className="size-6 font-medium mr-1" />
      <span className="text-black">Sair</span>
    </button>
  );
}
