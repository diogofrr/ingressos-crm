'use client'

import { PlusIcon } from "@/assets/img/plus-icon"
import useModal from "@/hooks/useModal"
import AddUserModal from "./add-user-modal"

export default function AddUserButton() {
  const { open, handleCloseModal, handleOpenModal } = useModal()

  return (
    <>
      <button onClick={handleOpenModal} className="btn btn-primary py-2 px-3 h-12 bg-blue-500 rounded-xl flex items-center justify-center w-full sm:w-auto md:w-64">
        <PlusIcon className="size-6 text-white mr-2 sm:mr-0 md:mr-2" />
        <span className="text-white block sm:hidden md:block">
          Adicionar ingresso
        </span>
      </button>
      {open && (
        <AddUserModal handleCloseModal={handleCloseModal} open={open} />
      )}
    </>
  )
}