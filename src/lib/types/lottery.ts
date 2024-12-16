import { ObjectId } from "mongodb"
import { z } from "zod"


export type LotteryDocument = {
    _id: ObjectId
    contract: {
        address: string,
        chainId: number
    },
    lotteryId: number, 
    ticketPrice: number,
    maxTickets: number,
    expiration: number,
    operatorCommissionPercentage: number,
    createdAt: number,
    winnerSelectedAt?: string,
    winnerAddress?: string
}

export type GetAllLotteriesResponse = {
    lotteries: LotteryDocument[]
}   

export type Lottery = Omit<LotteryDocument, '_id'>

export const createLotterySchema = z.object({
    contract: z.object({
        address: z.string().min(1),
        chainId: z.number().min(1)
    }),
    lotteryId: z.number().min(1),   
    ticketPrice: z.number().min(100),
    maxTickets: z.number().min(1),
    expiration: z.number().min(1000),
    operatorCommissionPercentage: z.number().min(1).max(50),
    createdAt: z.number().min(1),
})  
