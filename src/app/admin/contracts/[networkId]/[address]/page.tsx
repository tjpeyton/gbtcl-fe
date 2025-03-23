
'use client'

import { useEffect, useState, useCallback } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import AbiDisplay from '@/components/AbiDisplay'
import { toast } from '@/components/ui/hooks/use-toast'

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
    } catch (error: any) {
      toast({
        title: 'Failed to fetch contract',
        description: error.message,
        variant: 'destructive',
      })  
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
      <div>
        {isLoading && <Skeleton className="h-full w-full" />}
        {!isLoading && contract && 
          <AbiDisplay contract={contract} />
        }
      </div>
    </>
  )
} 

export default ManageContractPage
