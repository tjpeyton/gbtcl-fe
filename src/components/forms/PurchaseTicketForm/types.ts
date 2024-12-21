import { z } from 'zod'

import { purchaseTicketFormSchema } from './schema'

export type PurchaseTicketFormData = z.infer<typeof purchaseTicketFormSchema>   

export type PurchaseTicketFormProps = {
    onSubmit: (data: PurchaseTicketFormData, csrfToken: string) => Promise<void>
    isLoading: boolean
}
