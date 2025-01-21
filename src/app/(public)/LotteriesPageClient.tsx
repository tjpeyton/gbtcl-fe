'use client'

import { useState, useEffect } from 'react'

import LotteryCard  from '@/components/LotteryCard'
import TableSkeleton from '@/components/TableSkeleton'
import { toast } from '@/components/ui/hooks/use-toast'
import { PurchaseTicketForm } from '@/components/forms/PurchaseTicketForm'
import { PurchaseTicketFormData } from '@/components/forms/PurchaseTicketForm/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { LotteryDocument, GetAllLotteriesResponse, PurchaseLotteryTickets, PurchaseLotteryTicketsDTO } from '@/lib/types/lottery'

import { fetchAllLotteries, filterActiveLotteries } from '@/app/services/lotteryService'
import { useLotteryContract } from '@/app/hooks/useLotteryContract'


export const LotteriesPageClient = () => {
  const [lottery, setLottery] = useState<LotteryDocument>()
  const [isLoading, setIsLoading] = useState(false)
  const [isBuyingTickets, setIsBuyingTickets] = useState(false)
         

  const { getLotteryContract } = useLotteryContract() 

  const fetchLotteries = async () => {
    try {
      setIsLoading(true)
      const data: GetAllLotteriesResponse = await fetchAllLotteries()
      const lotteries: LotteryDocument[] = data.lotteries
      const activeLotteries = filterActiveLotteries(lotteries)

      setLottery(activeLotteries[0] as LotteryDocument)
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

  const updateLotteryTickets = async (purchase: PurchaseLotteryTickets, csrfToken: string) => {
    try {
      await updateLotteryTickets(purchase, csrfToken)
    } catch (error: any) {
      toast({
        title: 'Failed to update lottery tickets',
        description: error.message,
        variant: 'destructive' 
      })
    }
  }

  const handleBuyTickets = async (
    lottery: LotteryDocument, 
    data: PurchaseTicketFormData, 
    csrfToken: string
  ) => {
    try {
      setIsBuyingTickets(true)

      const contract = await getLotteryContract(lottery.contract.address)

      contract.once('TicketsBought', (
        buyer: string,
        lotteryId: number,
        ticketsBought: number
      ) => {
        const purchase: PurchaseLotteryTicketsDTO = {
          buyerAddress: buyer,
          lotteryId: lotteryId,
          count: ticketsBought,
          contract: lottery.contract
        }
        
        toast({ 
          title: 'Ticket purchase successful',
          description: 'Lottery ID: ' + lottery.lotteryId + ' created at ' + lottery.createdAt,
          variant: 'success' 
        })

        updateLotteryTickets(purchase, csrfToken)
      })

      const value = data.count * lottery.ticketPrice

      const tx = await contract.purchaseTickets(
        lottery.lotteryId, 
        data.count,
        { value: value }
      )  
        
      await tx.wait()
    } catch (error: any) {
      console.log('error', error) 
      toast({
        title: 'Failed to purchase tickets',
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setIsBuyingTickets(false)
    }
  }

  useEffect(() => {
    fetchLotteries()
  }, [])


  return (
        
    <div className="flex flex-row gap-4 justify-center">
      {!lottery && !isLoading && 
                <div className="flex flex-col">
                  <h1 className="text-l font-bold">No active lotteries</h1>
                </div> 
      }
      <div className="flex flex-col">
        {isLoading && <TableSkeleton rows={3} columns={1} />}
        {!isLoading && lottery && (
          <LotteryCard 
            key={lottery.lotteryId}
            lottery={lottery}
            isBuyingTickets={isBuyingTickets}
            onBuyTickets={(data, csrfToken) => handleBuyTickets(lottery, data, csrfToken)}
          />
        )}
      </div>
      <div className="flex flex-col">
        {isLoading && <TableSkeleton rows={3} columns={1} />}
        {!isLoading && lottery && (
          <Card className="min-w-96">
            <CardHeader className="flex flex-row items-center justify-between">
              <h1 className="text-l">Price per ticket: </h1>
              <p className="text-l font-bold">
                {lottery.ticketPrice} wei (ETH)
              </p>
            </CardHeader>
            <CardContent>
              <PurchaseTicketForm 
                onSubmit={(data, csrfToken) => handleBuyTickets(lottery, data, csrfToken)} 
                isLoading={isBuyingTickets || false} 
                ticketPrice={lottery.ticketPrice}    
              />
            </CardContent>
          </Card>
        )}
      </div>  
    </div>
  )
}
