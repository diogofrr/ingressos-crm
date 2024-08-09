'use client'

import { CloseIcon } from "@/assets/img/close-icon"

interface AddUserModal {
  open: boolean
  handleCloseModal: () => void
}

export default function AddUserModal({ open, handleCloseModal }: AddUserModal) {
  return (
    <div className="absolute top-0 left-0 w-full min-h-[800px] h-full z-10 bg-slate-950/20 p-6">
      <div className="relative bg-white w-full sm:w-[600px] h-full sm:h-[700px] mx-auto top-2/4 -translate-y-2/4 rounded-lg px-6 py-6">
        <header className="text-slate-950 flex items-center justify-between">
          <h2 className="text-2xl font-medium">Cadastrar Ingresso</h2>
          <button className="hover:bg-slate-100 p-1 transition-all rounded-full" onClick={handleCloseModal}>
            <CloseIcon className="size-6 text-slate-950" />
          </button>
        </header>
        <span className="h-1 w-full bg-slate-950"></span>
      </div>
    </div>
  )
}