"use client"

import { ColumnDef } from "@tanstack/react-table"

export type LotteryColumn = {
  lotteryId: number,
  contract: {
    address: string,  
    chainId: number
  },
  maxTickets: number,
  ticketPrice: number,
  createdAt: string
}

export const columns: ColumnDef<LotteryColumn>[] = [
  {
    accessorKey: "lotteryId",
    header: "ID",
  },
  {
    accessorKey: "contract.address",
    header: "Address",
  },
  {
    accessorKey: "contract.chainId",
    header: "Chain ID",
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
