"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from "@/lib/utils"

export type LotteryColumn = {
  lotteryId: number,
  contract: {
    address: string,  
    chainId: number
  },
  maxTickets: number,
  ticketPrice: number,
  createdAt: number
}

export const columns: ColumnDef<LotteryColumn>[] = [
  {
    header: "ID",
    accessorKey: "lotteryId",
  },
  {
    header: "Contract Address",
    accessorKey: "contract.address"
  },
  {
    header: "Chain",
    accessorKey: "contract.chainId",
    cell: ({ row }) => {
      const chainId = row.original.contract.chainId
      return CHAIN_ID_TO_NETWORK[chainId]
    }
  },
  {
    header: "Max Tickets",
    accessorKey: "maxTickets"
  },
  {
    header: "Ticket Price",
    accessorKey: "ticketPrice"
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return formatUnixTimestampFromSeconds(createdAt)
    }
  },
]
