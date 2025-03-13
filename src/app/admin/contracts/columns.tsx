'use client'

import Link from 'next/link'
import { Ellipsis, Trash2, View } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { ContractAbv } from '@/lib/types/lottery'
import { ContractDocument } from '@/lib/types/contract'
import { CHAIN_ID_TO_NETWORK } from '@/lib/utils'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/hooks/use-toast'

import { deleteContract } from '@/app/services/contractService'


const removeContract = async (contract: ContractAbv) => {
  try {
    await deleteContract(contract)
    toast({
      title: 'Contract deleted successfully',
      description: 'The contract has been deleted successfully',
      variant: 'success', 
    })
  } catch (error: any) {
    toast({
      title: 'Failed to delete contract',
      description: error.message,
      variant: 'destructive',
    })
  }
} 

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
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => {
      const contract = row.original

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
                  href={`/admin/contracts/${contract.chainId}/${contract.address}`}>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <View className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                </Link>
              <DropdownMenuItem
                className="hover:cursor-pointer text-destructive"
                onClick={() => {
                  removeContract({chainId: Number(contract.chainId), address: contract.address})
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
