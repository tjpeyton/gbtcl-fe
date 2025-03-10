'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ContractDocument } from '@/lib/types/contract'
import { CHAIN_ID_TO_NETWORK } from '@/lib/utils'


export const columns: ColumnDef<ContractDocument>[] = [
  {
    header: 'Chain',
    accessorKey: 'chainId',
    cell: ({ row }) => {
      const chainId = row.original.chainId
      return CHAIN_ID_TO_NETWORK[chainId]
    }
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Deployed',
    accessorKey: 'deployed',
    cell: ({ row }) => {
      const date = row.original.createdAt 
      return date ? new Date(date).toLocaleDateString() : '-'
    } 
  },
]
