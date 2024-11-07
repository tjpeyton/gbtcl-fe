'use client'

import { useEffect, useState } from 'react'

import { toast } from '@/lib/hooks/use-toast'

import { DataTable } from "@/components/ui/table"
import { CreateLotteryDialog } from '@/components/dialog/CreateLotteryDialog'

import { Lottery, columns } from "./columns"


export const LotteryPage = () =>  {
  const [lotteries, setLotteries] = useState<Lottery[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLotteries = async () => {
    try {
      const response = await fetch('/api/lottery')
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setLotteries(data.lotteries || [])
    } catch (error) {
      toast({
        title: 'Failed to fetch lotteries',
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLotteries()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Lotteries</h1>
        <CreateLotteryDialog onSuccess={fetchLotteries} />
      </div>
      <DataTable 
        data={lotteries} 
        columns={columns} 
      />
    </div>
  )
}
