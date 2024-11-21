import { z } from 'zod'


export const lotteryFormSchema = z.object({
    contract: z.object({
        address: z.string().min(1, { message: "Contract address is required" }),
        chainId: z.number().min(1, { message: "Chain ID is required" }),
    }), 
    ticketPrice: z.number().min(100, { message: "Ticket price is required" }),
    maxTickets: z.number().min(1, { message: "Max tickets is required" }),
    expiration: 
        z.number()
            .min(1000, { message: "Lottery expiration is required" })
            .max(100000, { message: "Lottery expiration must be between 1000 and 100000 seconds" }),
    commissionPercentage: 
        z.number()
            .min(1, { message: "Commission percentage is required" })
            .max(50, { message: "Commission percentage must be between 1 and 50" }),  
})
