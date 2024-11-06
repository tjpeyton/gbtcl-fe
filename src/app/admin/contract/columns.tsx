"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Contract = {
  chainId: string,
  address: string,
  lottery: string[],
  abi: any[]
}

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "chainId",
    header: "Network",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "lottery",
    header: "Lotteries",
  },
]
