import { z } from 'zod'


export const lotterySchema = z.object({
    contractAddress: z.string().min(1, { message: "Contract address is required" }),
    chain: z.string().min(1, { message: "Chain is required" }),
    ticketPrice: z.number().min(1, { message: "Ticket price is required" }),
    maxTickets: z.number().min(1, { message: "Max tickets is required" }),
    expiration: z.number().min(1, { message: "Lottery expiration is required" }),
    commissionPercentage: z.number().min(1, { message: "Commission percentage is required" }),  
})
