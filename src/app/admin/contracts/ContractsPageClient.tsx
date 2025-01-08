'use client'

import { useEffect, useState } from 'react'
import { Plug } from 'lucide-react'

import { DataTable } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/hooks/use-toast'
import TableSkeleton from '@/components/TableSkeleton'
import FormDialog from '@/components/dialog/FormDialog'
import { ConnectContractForm } from '@/components/forms/ConnectContractForm'
import { ConnectContractFormData } from '@/components/forms/ConnectContractForm/types'

import { fetchAllContracts, saveContract } from '@/app/services/contractService'

import { ContractDocument, GetAllContractsResponse } from '@/lib/types/contract'

import { columns } from './columns'


export const ContractsPageClient = () => {
  const [contracts, setContracts] = useState<ContractDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [contractDialogOpen, setContractDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const fetchContracts = async () => {
    try {
      setIsLoading(true)  
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

  const handleConnectContract = async (data: ConnectContractFormData, csrfToken: string) => {
    try {
      setIsCreating(true)
      const response = await saveContract(data, csrfToken)

      if (!response.ok) {
        const data = await response.json()
        toast({
          title: 'Failed to connect contract',
          description: data.error || data.message,
          variant: 'destructive' 
        })
        return
      } else {
        toast({
          title: 'Contract connected',
          description: 'You can now interact with the contract',
          variant: 'success'
        })
        fetchContracts()
      } 

      setContractDialogOpen(false)
    } catch (error) {
      toast({
        title: 'Failed to connect contract',
        description: 'Please try again',
        variant: 'destructive' 
      })
    } finally {
      setIsCreating(false)
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
          <FormDialog
            title="Connect Contract"
            description="Connect a deployed contract to the platform"
            isOpen={contractDialogOpen}
            setIsOpen={setContractDialogOpen}
            trigger={
              <Button icon={<Plug/>}>
                Connect Contract
              </Button>
            }  
            form={
              <ConnectContractForm 
                onSubmit={handleConnectContract}
                isLoading={isCreating}
              />
            }
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
