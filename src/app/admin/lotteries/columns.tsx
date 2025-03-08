'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Ellipsis, Pencil, Trash2 } from 'lucide-react'

import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from '@/lib/utils'

import { LotteryDocument } from '@/lib/types/lottery'

import { isLotteryActive } from '@/app/services/lotteryService'

import StatusCircle from '@/components/StatusCircle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Link from 'next/link'  

const deleteLottery = async (lotteryId: string) => {
  try { 
    await deleteLottery(lotteryId)
  } catch (error) {
    console.error(error)
  }
}
 

export const columns: ColumnDef<LotteryDocument>[] = [
  {
    header: 'Status',
    accessorKey: 'expiration',
    cell: ({ row }) => {
      const lottery = row.original
      return (
        <div className='flex flex-row items-center justify-center'>  
          {isLotteryActive(lottery) 
            ? <StatusCircle status='active' /> 
            : <StatusCircle status='inactive' />}
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
              <Link href={`/admin/lotteries/${lottery.lotteryId}`}>
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
                  // delete lottery
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
