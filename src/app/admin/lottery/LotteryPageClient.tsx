'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { toast } from '@/app/hooks/use-toast'

import { Lottery } from '@/app/api/lottery/route'

import { DataTable } from "@/components/ui/table"
import { CreateLotteryDialog } from '@/components/dialog/CreateLotteryDialog'
import { CreateLotteryFormData } from '@/components/forms/CreateLotteryForm/types'

import { WalletContext, useWalletContext } from '@/context/WalleContext'

import { minutesToSeconds } from '@/lib/utils'

import { columns, LotteryColumn } from "./columns"


export const LotteryPageClient = () =>  {
  const [lotteries, setLotteries] = useState<Lottery[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const {
    state: { isAuthenticated, provider },
    switchNetwork,
    getBlockTimestamp,
  } = useWalletContext() as WalletContext;

  const fetchLotteries = async () => {
    try {
      const response = await fetch('/api/lottery')
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setLotteries(data.lotteries || [])
    } catch (error: any) {
      toast({
        title: 'Failed to fetch lotteries',
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createLottery = async (
    lottery: Lottery,
    csrfToken: string
  ) => {
    try { 
      const response = await fetch('/api/lottery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(lottery)
      }) 
      if (!response.ok) throw new Error('Failed to create lottery')

      toast({ 
        title: 'Lottery saved to database successfully',
        description: 'Lottery ID: ' + lottery.lotteryId + ' created at ' + lottery.createdAt,
        variant: 'default' 
      })
      fetchLotteries() 

    } catch (error: any) {
      toast({ 
        title: 'Failed to save lottery to database',
        description: error.message,
        variant: 'destructive' 
      })
    }
  } 

  const fetchContract = async (contractAddress: string) => {
    const response = await fetch(`/api/contract?address=${contractAddress}`)
    if (!response.ok) throw new Error('Failed to fetch contract')

    const data = await response.json()
    return data  
  }

  const handleCreateLottery = async (data: CreateLotteryFormData, csrfToken: string) => {
    try {
      setIsCreating(true)
      if (!isAuthenticated) throw new Error('User is not authenticated')

      // Switch network if necessary
      const chain = await provider?.getNetwork()
      const currentChainId = Number(chain?.chainId)  
      if (currentChainId !== data.contract.chainId) {
        await switchNetwork(data.contract.chainId)
      }

      const signer = await provider?.getSigner()
      if (!signer) throw new Error('Signer not found')  

      // Fetch contract and retrieve ABI
      const res = await fetchContract(data.contract.address)
      const contract = res.contract
      if (!contract) throw new Error('Contract not found')

      const contractInstance = new ethers.Contract(data.contract.address, contract.abi, signer)

      // Listen for LotteryCreated event
      contractInstance.once("LotteryCreated", (
        ticketPrice: number,
        maxTickets: number,
        operatorCommissionPercentage: number,
        expiration: number,
        lotteryId: number
      ) => {

        const lottery: Lottery = {
          contract: {
            address: data.contract.address,
            chainId: data.contract.chainId
          },
          // Convert to number to handle BigInt
          lotteryId: Number(lotteryId),
          ticketPrice: Number(ticketPrice),
          maxTickets: Number(maxTickets),
          operatorCommissionPercentage: Number(operatorCommissionPercentage),
          expiration: Number(expiration),
          createdAt: Number(blockTimestamp)
        }
        toast({ 
          title: 'Lottery created successfully',
          description: 'Lottery ID: ' + lottery.lotteryId + ' created at ' + lottery.createdAt,
          variant: 'default' 
        }) 
        createLottery(lottery, csrfToken)
      })

      // Get current block timestamp
      const blockTimestamp = await getBlockTimestamp()
      if (!blockTimestamp) throw new Error('Block timestamp not found')

      const expiration = blockTimestamp + minutesToSeconds(data.expiration)

      const tx = await contractInstance.createLottery(
        data.ticketPrice, 
        data.maxTickets, 
        data.commissionPercentage,
        expiration,
      )

      await tx.wait()
    } catch (error: any) {
      toast({ 
        title: 'Failed to create lottery',
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setIsCreating(false)
    }
  }

  useEffect(() => {
    fetchLotteries()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Lotteries</h1>
        <CreateLotteryDialog 
          onSuccess={fetchLotteries}
          onSubmit={handleCreateLottery}
          isLoading={isCreating}
        />
      </div>
      <DataTable 
        data={lotteries as LotteryColumn[]} 
        columns={columns} 
      />
    </div>
  )
}
