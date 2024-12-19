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
    tickets: string[],
    winnerSelectedAt?: string,
    winnerAddress?: string
}

export type Lottery = Omit<LotteryDocument, '_id' | 'tickets'>
export type LotteryDTO = Omit<LotteryDocument, '_id'>

export type GetAllLotteriesResponse = {
    lotteries: LotteryDocument[]
}   

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

export const purchaseLotteryTicketSchema = z.object({
    lotteryId: z.string().min(1),
    lotteryContract: z.string().min(1),
    count: z.number().min(1),
    price: z.number().min(1),   
})
