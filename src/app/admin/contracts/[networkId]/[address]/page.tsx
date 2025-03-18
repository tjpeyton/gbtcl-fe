
'use client'

import { useEffect, useState, useCallback } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import ContractActionsCard from '@/components/ContractActionsCard'
import ContractDetailsCard from '@/components/ContractDetailsCard'
import { ContractDocument } from '@/lib/types/contract'
import { fetchContract } from '@/app/services/contractService'


type ManageContractPageProps = {
  params: {
    networkId: string
    address: string
  }
}


const ManageContractPage = ({ params }: ManageContractPageProps) => {
  const { networkId, address } = params
  const [contract, setContract] = useState<ContractDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)  

  const getContract = useCallback(async () => {
    try {
      setIsLoading(true)
      const contract = await fetchContract({ chainId: Number(networkId), address })
      setContract(contract)
    } catch (error) {
      console.error('Failed to fetch contract:', error)
    } finally {
      setIsLoading(false)
    }
  }, [networkId, address])

  useEffect(() => {
    getContract()
  }, [getContract])


  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Contract</h1>
          <p className="text-muted-foreground">
            View and manage contract details, lotteries, and transfer funds
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {isLoading && <Skeleton className="h-full w-full" />}
        {!isLoading && contract && 
          <ContractDetailsCard 
            contract={contract} 
          />
        }
        {!isLoading && contract &&
          <ContractActionsCard 
            contract={contract} 
          />
        }
      </div>
    </>
  )
} 

export default ManageContractPage
