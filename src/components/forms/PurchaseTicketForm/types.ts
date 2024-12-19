import { z } from 'zod'

export type PurchaseTicketFormData = z.infer<typeof purchaseTicketFormSchema>   

export const purchaseTicketFormSchema = z.object({
    count: z.number().min(1, { message: "You must purchase at least one ticket" }),
    price: z.number().min(1),
})

export type PurchaseTicketFormProps = {
    onSubmit: (data: PurchaseTicketFormData, csrfToken: string) => Promise<void>
    isLoading: boolean
}
