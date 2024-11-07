import { z } from 'zod'

import { Contract } from '@/app/admin/contract/columns'

import { lotterySchema } from './schema'


export type FormData = z.infer<typeof lotterySchema>

export interface CreateLotteryFormProps {
  onSubmit: (data: FormData, csrfToken: string) => Promise<void>
  isLoading?: boolean
  contracts: Contract[] 
}
