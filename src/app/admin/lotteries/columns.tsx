'use client'

import Link from 'next/link'  
import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds, getLotteryStatus } from '@/lib/utils'
import { LotteryDocument, ContractAbv } from '@/lib/types/lottery'

 
const columns = (onDelete: (lotteryId: string, contract: ContractAbv) => Promise<void>): ColumnDef<LotteryDocument>[] => [
  {
    header: 'Status',
    accessorKey: 'expiration',
    cell: ({ row }) => {
      const lottery = row.original
      return (
        <div className='flex flex-row'>  
          <Badge variant={
            getLotteryStatus(lottery)
              .toLowerCase() as 'open' | 'drawing' | 'winnerSelected' | 'completed' | 'cancelled'
          }>
            {getLotteryStatus(lottery)}
          </Badge>
        </div>
      )
    }
  },
  {
    header: 'ID',
    accessorKey: 'lotteryId',
  },
  {
    header: 'Contract Address',
    accessorKey: 'contract.address',
  },
  {
    header: 'Chain',
    accessorKey: 'contract.chainId',
    cell: ({ row }) => {
      const chainId = row.original.contract.chainId
      return CHAIN_ID_TO_NETWORK[chainId]
    },
  },
  {
    header: 'Max Tickets',
    accessorKey: 'maxTickets',
  },
  {
    header: 'Ticket Price',
    accessorKey: 'ticketPrice',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return formatUnixTimestampFromSeconds(createdAt)
    },
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => {
      const lottery = row.original

      return (
        <div className='flex flex-row'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='ghost'>
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link 
                href={`/admin/contracts/${lottery.contract.chainId}/${lottery.contract.address}/lotteries/${lottery.lotteryId}`}>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-destructive hover:cursor-pointer"
                onClick={() => {
                  onDelete(String(lottery.lotteryId), lottery.contract)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }
]

export default columns
