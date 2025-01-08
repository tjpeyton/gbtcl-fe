import { z } from 'zod'

const purchaseTicketFormSchema = z.object({
  count: z.number().min(1, { message: 'You must purchase at least one ticket' }),
})

export default purchaseTicketFormSchema
