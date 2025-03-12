'use client'

import { useEffect, useState, useCallback } from 'react'

import { fetchLottery } from '@/app/services/lotteryService'

import LotteryDetailsCard from '@/components/LotteryDetailsCard'
import { Skeleton } from '@/components/ui/skeleton'
import LotteryActionsCard from '@/components/LotteryActionsCard'

import { LotteryDocument } from '@/lib/types/lottery'


type ManageLotteryPageProps = {
  params: {
    networkId: string
    address: string
    id: string
  }
}


const ManageLotteryPage = ({ params }: ManageLotteryPageProps) => {
  const { networkId, address, id } = params
  const [lottery, setLottery] = useState<LotteryDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)  

  const getLottery = useCallback(async () => {
    try {
      setIsLoading(true)
      const lottery = await fetchLottery({ chainId: Number(networkId), address }, Number(id))
      setLottery(lottery)
    } catch (error) {
      console.error('Failed to fetch lottery:', error)
    } finally {
      setIsLoading(false)
    }
  }, [networkId, address, id])

  useEffect(() => {
    getLottery()
  }, [getLottery])


  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Lottery</h1>
          <p className="text-muted-foreground">
            View and manage lottery details, draw winners, and transfer funds
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {isLoading && <Skeleton className="h-full w-full" />}
        {!isLoading && lottery && 
          <LotteryDetailsCard 
            lottery={lottery} 
          />
        }
        {!isLoading && lottery &&
          <LotteryActionsCard 
            lottery={lottery} 
          />
        }
      </div>
    </div>
  )
} 

export default ManageLotteryPage
