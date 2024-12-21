'use client'

import { useState, useEffect } from "react"

import { LotteryCard } from "@/components/LotteryCard"
import TableSkeleton from "@/components/TableSkeleton"
import { toast } from "@/components/ui/hooks/use-toast"

import { LotteryDocument, GetAllLotteriesResponse } from "@/lib/types/lottery"

import { fetchAllLotteries, filterActiveLotteries, filterExpiredLotteries } from "../services/lotteryService"
import { PurchaseTicketFormData } from "@/components/forms/PurchaseTicketForm/types"


export const LotteriesPageClient = () => {
    const [activeLotteries, setActiveLotteries] = useState<LotteryDocument[]>([])
    const [expiredLotteries, setExpiredLotteries] = useState<LotteryDocument[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isBuyingTickets, setIsBuyingTickets] = useState(false)

    const fetchLotteries = async () => {
        try {
            setIsLoading(true)
            const data: GetAllLotteriesResponse = await fetchAllLotteries()
            const lotteries: LotteryDocument[] = data.lotteries

            setActiveLotteries(filterActiveLotteries(lotteries) as LotteryDocument[] || [])
            setExpiredLotteries(filterExpiredLotteries(lotteries) as LotteryDocument[] || [])
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

    const handleBuyTickets = async (lottery: LotteryDocument, data: PurchaseTicketFormData, csrfToken: string) => {
        console.log('Buy Tickets', lottery, data, csrfToken)
        setIsBuyingTickets(true)
        // purchase tickets through the blockchain

        // update the database
        setIsBuyingTickets(false)
    }

    useEffect(() => {
        fetchLotteries()
    }, [])


    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center">
                <h2 className="text-2xl font-bold">Active Lotteries</h2>
                <h2 className="text-xl pl-2">
                    {activeLotteries.length}
                </h2>
            </div>
            {isLoading && <TableSkeleton rows={3} columns={1} />}
            {!isLoading && activeLotteries.map((lottery) => (
                <LotteryCard 
                    key={lottery.lotteryId}
                    lottery={lottery}
                    isBuyingTickets={isBuyingTickets}
                    onBuyTickets={(data, csrfToken) => handleBuyTickets(lottery, data, csrfToken)}
                />
            ))}
            <div className="flex flex-row items-center">
                <h2 className="text-2xl font-bold">Expired Lotteries</h2>
                <h2 className="text-xl pl-2">
                    {expiredLotteries.length}
                </h2>
            </div>
            {isLoading && <TableSkeleton rows={3} columns={1} />}
            {!isLoading && expiredLotteries.map((lottery) => (
                <LotteryCard 
                    key={lottery.lotteryId}
                    lottery={lottery} 
                    isBuyingTickets={isBuyingTickets}
                    onBuyTickets={(data, csrfToken) => handleBuyTickets(lottery, data, csrfToken)}
                />
            ))}                 
        </div>
    )
}
