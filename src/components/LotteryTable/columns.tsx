"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Lottery = {
  id: string,
  expiration: string,
  ticketPrice: number,
  payout: number,
  status: "Open" | "Winner Drawn",
}

export const columns: ColumnDef<Lottery>[] = [
  {
    accessorKey: "id",
    header: "Lottery ID",
  },
  {
    accessorKey: "payout",
    header: "Payout",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "expiration",
    header: "Expiration",
  },
  {
    accessorKey: "ticketPrice",
    header: "Ticket Price",
  },
]
