'use client'

import { useEffect, useState } from 'react'
import { Plug } from 'lucide-react'

import { DataTable } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/hooks/use-toast'
import TableSkeleton from '@/components/TableSkeleton'
import FormDialog from '@/components/dialog/FormDialog'
import Header from '@/components/Header'
import { ConnectContractForm } from '@/components/forms/ConnectContractForm'
import { ConnectContractFormData } from '@/components/forms/ConnectContractForm/types'

import { deleteContract, fetchAllContracts, saveContract } from '@/app/services/contractService'

import { ContractDocument, GetAllContractsResponse } from '@/lib/types/contract'
import { ContractAbv } from '@/lib/types/lottery'

import  columns from './columns'


const ContractsPageClient = () => {
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

      await saveContract(data, csrfToken)

      fetchContracts()
      setContractDialogOpen(false)

      toast({
        title: 'Contract connected',
        description: 'You can now interact with the contract',
        variant: 'success'
      })
    } catch (error: any) {
      toast({
        title: 'Failed to connect contract',
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteContract = async (contract: ContractAbv) => {
    try {
      await deleteContract(contract)

      fetchContracts()

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
  

  useEffect(() => {
    fetchContracts()
  }, [])


  return (
    <>
      <Header
        title="Contracts"
        dialog={!isLoading && 
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
        }>
      </Header>
      {isLoading && <TableSkeleton rows={5} columns={3} />}
      {!isLoading && (
        <DataTable 
          data={contracts} 
          columns={columns(handleDeleteContract)}
        />
      )}
    </>
  )
}

export default ContractsPageClient  
