import { z } from 'zod'


export const contractSchema = z.object({
    contractAddress: z.string().min(1, { message: "Contract address is required" }),
    chain: z.string().min(1, { message: "Chain is required" }),
})
