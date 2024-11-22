"use client"

import { CHAIN_ID_TO_NETWORK } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

export type Contract = {
  chainId: string,
  address: string,
  lottery: string[],
  abi: any[]
}

export const columns: ColumnDef<Contract>[] = [
  {
    header: "Chain",
    accessorKey: "chainId",
    cell: ({ row }) => {
      const chainId = row.original.chainId
      return CHAIN_ID_TO_NETWORK[chainId]
    }
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Lotteries Deployed",
    accessorKey: "lottery",
    cell: ({ row }) => {
      const lottery = row.original.lottery
      return lottery.length
    } 
  },
]
