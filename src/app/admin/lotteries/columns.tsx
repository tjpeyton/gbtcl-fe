'use client'

import Link from 'next/link'  
import { Ellipsis, Pencil, Trash2 } from 'lucide-react'

import { ColumnDef } from '@tanstack/react-table'

import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from '@/lib/utils'
import { LotteryDocument, ContractAbv } from '@/lib/types/lottery'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/hooks/use-toast'

import { isLotteryActive, deleteLottery } from '@/app/services/lotteryService'


const removeLottery = async (lotteryId: string, contract: ContractAbv) => {
  try { 
    await deleteLottery(contract, lotteryId)
    toast({
      title: 'Lottery deleted successfully',
      description: 'The lottery has been deleted successfully',
      variant: 'success', 
    })  
  } catch (error: any) {
    toast({
      title: 'Failed to delete lottery',
      description: error.message,
      variant: 'destructive',
    })
  }
} 

export const columns: ColumnDef<LotteryDocument>[] = [
  {
    header: 'Status',
    accessorKey: 'expiration',
    cell: ({ row }) => {
      const lottery = row.original
      return (
        <div className='flex flex-row'>  
          {
            isLotteryActive(lottery) 
              ? <Badge variant='open'>Open</Badge> 
              : <Badge variant='drawing'>Drawing</Badge>
          }
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
                  removeLottery(String(lottery.lotteryId), lottery.contract)
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
