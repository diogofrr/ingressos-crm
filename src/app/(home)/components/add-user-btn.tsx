'use client'

import { PlusIcon } from "@/assets/img/plus-icon"

export default function AddUserButton() {
  return (
    <button className="btn btn-primary py-2 px-3 h-12 bg-blue-500 rounded-xl flex items-center justify-center w-full sm:w-auto md:w-64">
      <PlusIcon className="size-6 text-white md:mr-2" />
      <span className="text-white block sm:hidden md:block">
        Adicionar ingresso
      </span>
    </button>
  )
}