import { z } from 'zod'

import { Contract } from '@/app/admin/contract/columns'

import { lotteryFormSchema } from './schema'


export type CreateLotteryFormData = z.infer<typeof lotteryFormSchema>

export interface CreateLotteryFormProps {
  onSubmit: (data: CreateLotteryFormData, csrfToken: string) => Promise<void>
  isLoading?: boolean
  contracts: Contract[] 
}
