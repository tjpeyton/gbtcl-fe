'use client'

import { useState, useEffect } from "react"

import { LotteryCard } from "@/components/LotteryCard"
import TableSkeleton from "@/components/TableSkeleton"
import { toast } from "@/components/ui/hooks/use-toast"
import { PurchaseTicketForm } from "@/components/forms/PurchaseTicketForm"
import { PurchaseTicketFormData } from "@/components/forms/PurchaseTicketForm/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { LotteryDocument, GetAllLotteriesResponse, PurchaseLotteryTickets, PurchaseLotteryTicketsDTO } from "@/lib/types/lottery"

import { fetchAllLotteries, filterActiveLotteries } from "../services/lotteryService"
import { useContract } from "../hooks/useContract"


export const LotteriesPageClient = () => {
    const [activeLotteries, setActiveLotteries] = useState<LotteryDocument[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isBuyingTickets, setIsBuyingTickets] = useState(false)

    const { getContract } = useContract() 

    const fetchLotteries = async () => {
        try {
            setIsLoading(true)
            const data: GetAllLotteriesResponse = await fetchAllLotteries()
            const lotteries: LotteryDocument[] = data.lotteries

            setActiveLotteries(filterActiveLotteries(lotteries) as LotteryDocument[] || [])
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

            const contract = await getContract(lottery.contract.address)

            contract.once("TicketsBought", (
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

            const tx = await contract.purchaseTickets(
                lottery.lotteryId, 
                data.count, 
            )
        
            await tx.wait()
        } catch (error: any) {
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
        <div className="flex flex-row gap-4">
            <div className="flex flex-col">
                {isLoading && <TableSkeleton rows={3} columns={1} />}
                {!isLoading && activeLotteries.length === 0 && <p>No active lotteries</p>}
                {!isLoading && activeLotteries.map((lottery) => (
                    <LotteryCard 
                        key={lottery.lotteryId}
                        lottery={lottery}
                        isBuyingTickets={isBuyingTickets}
                        onBuyTickets={(data, csrfToken) => handleBuyTickets(lottery, data, csrfToken)}
                    />
                ))}
            </div>
            <div className="flex flex-col">
                {isLoading && <TableSkeleton rows={3} columns={1} />}
                {!isLoading && activeLotteries.length > 0 && (
                    <Card>
                        <CardHeader>
                            <h3 className="text-l font-bold">Price per ticket</h3>
                        </CardHeader>
                        <CardContent>
                            <PurchaseTicketForm 
                                onSubmit={(data, csrfToken) => handleBuyTickets(activeLotteries[0], data, csrfToken)} 
                                isLoading={isBuyingTickets || false} 
                                ticketPrice={activeLotteries[0].ticketPrice}    
                            />
                        </CardContent>
                    </Card>
                )}
            </div>  
        </div>
    )
}
