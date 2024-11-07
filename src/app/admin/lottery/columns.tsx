"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Lottery = {
  id: string,
  contractAddress: string,
  status: 'created' | 'started' | 'ended' | 'winner_selected',
  maxTickets: string,
  ticketPrice: string,
  createdAt: string,
  startedAt: string,
  endedAt: string, 
  winnerSelectedAt: string,
  winnerAddress: string,
}

export const columns: ColumnDef<Lottery>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "contractAddress",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "maxTickets",
    header: "Max Tickets",
  },
  {
    accessorKey: "ticketPrice",
    header: "Ticket Price",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
]
