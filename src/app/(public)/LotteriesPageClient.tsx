'use client'

import { useState, useEffect } from "react"

import { LotteryCard } from "@/components/LotteryCard"
import { Skeleton } from "@/components/ui/skeleton"

import { Lottery } from "@/app/api/lottery/route"

import { toast } from "../hooks/use-toast"
import { secondsToMilliseconds } from "@/lib/utils"


export const LotteriesPageClient = () => {
    const [activeLotteries, setActiveLotteries] = useState<Lottery[]>([])
    const [expiredLotteries, setExpiredLotteries] = useState<Lottery[]>([])
    const [loading, setLoading] = useState(true)

    const fetchLotteries = async () => {
        try {
            const response = await fetch('/api/lottery')
            if (!response.ok) throw new Error('Failed to fetch lotteries')

            const data = await response.json()
            const currentDate = new Date()
            const activeLotteries = data.lotteries.filter(
                (lottery: Lottery) => new Date(secondsToMilliseconds(lottery.expiration)) > currentDate
            )
            const expiredLotteries = data.lotteries.filter(
                (lottery: Lottery) => new Date(secondsToMilliseconds(lottery.expiration)) < currentDate
            )
            setActiveLotteries(activeLotteries || [])
            setExpiredLotteries(expiredLotteries || [])
            setLoading(false)
        } catch (error: any) {
            toast({
                title: 'Failed to fetch lotteries',
                description: error.message,
                variant: 'destructive' 
            })
        }
    }

    const handleBuyTickets = (lotteryId: number) => {
        console.log('Buy Tickets', lotteryId)
    }

    useEffect(() => {
        fetchLotteries()
    }, [])


    return (
        <div className="flex flex-col gap-4">
            {loading ? (
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-row items-center">
                        <h2 className="text-2xl font-bold">Active Lotteries</h2>
                        <h2 className="text-xl pl-2">
                            {activeLotteries.length}
                        </h2>
                    </div>
                    {activeLotteries.map((lottery) => (
                        <LotteryCard 
                            key={lottery.lotteryId}
                            lottery={lottery}
                            isActive={true}
                            onBuyTickets={() => handleBuyTickets(lottery.lotteryId)}
                        />
                    ))}
                    <div className="flex flex-row items-center">
                        <h2 className="text-2xl font-bold">Expired Lotteries</h2>
                        <h2 className="text-xl pl-2">
                            {expiredLotteries.length}
                        </h2>
                    </div>
                    {expiredLotteries.map((lottery) => (
                        <LotteryCard 
                            key={lottery.lotteryId}
                            lottery={lottery} 
                            isActive={false}
                        />
                    ))} 
                </>
            )}
        </div>
    )
}
