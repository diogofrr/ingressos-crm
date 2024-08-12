'use client'

import useModal from "@/hooks/useModal"
import EditUserModal from "./edit-user-modal"
import { GetAllTicketsData } from "@/types/tickets/get-all-tickets"
import { EditIcon } from "@/assets/img/edit-icon"

interface EditUserButtonProps {
  handleGetTickets: () => void
  ticketInfo: GetAllTicketsData
}

export default function EditUserButton({ ticketInfo, handleGetTickets }: EditUserButtonProps) {

  return (
    <>

    </>
  )
}