'use client'

import { useEffect, useState } from 'react'

import { DataTable } from "@/components/ui/table"
import { ConnectContractDialog } from '@/components/dialog/ConnectContractDialog'
import { toast } from '@/components/ui/hooks/use-toast'
import TableSkeleton from '@/components/TableSkeleton'

import { fetchAllContracts } from '@/app/services/contractService'

  import { ContractDocument, GetAllContractsResponse } from '@/lib/types/contract'

import { columns } from "./columns"


export const ContractsPageClient = () => {
  const [contracts, setContracts] = useState<ContractDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchContracts = async () => {
    try {
      const data: GetAllContractsResponse = await fetchAllContracts()
      const contracts: ContractDocument[] = data.contracts

      setContracts(contracts || [])
    } catch (error: any) {
      toast({
        title: 'Failed to retrieve contracts',
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  } 

  useEffect(() => {
    fetchContracts()
  }, [])


  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Contracts</h1>
        {!isLoading && 
          <ConnectContractDialog 
            onSuccess={fetchContracts} 
          />
        }
      </div>
      {isLoading && <TableSkeleton rows={5} columns={3} />}
      {!isLoading && (
        <DataTable 
          data={contracts} 
          columns={columns} 
        />
      )}
    </div>
  )
}
