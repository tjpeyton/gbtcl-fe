import { z } from 'zod'

// Different schema for the form and the database
// This ommits the createdAt field as it is set after the contracts response is received
const lotteryFormSchema = z.object({
  contract: z.object({
    address: z.string().min(1, { message: 'Contract address is required' }),
    chainId: z.number().min(1, { message: 'Chain ID is required' }),
  }),
  ticketPrice: z.number().min(100, { message: 'Ticket price is required' }),
  maxTickets: z.number().min(1, { message: 'Max tickets is required' }),
  expiration: z.number().min(5, 
    { message: 'Lottery expiration over of at least 5 minutes is required' })
    .max(120, { message: 'Lottery expiration must be between 5 and 120 minutes' }),
  commissionPercentage: z.number().min(1, 
    { 
      message: 'Commission percentage is required' 
    }).max(50, 
    { message: 'Commission percentage must be between 1 and 50' }),
})

export default lotteryFormSchema
