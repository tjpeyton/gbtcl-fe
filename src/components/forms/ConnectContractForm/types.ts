import { z } from 'zod'

import { connectContractSchema } from '@/lib/types/contract'

export type ConnectContractFormData = z.infer<typeof connectContractSchema>

export interface ConnectContractFormProps {
  onSubmit: (data: ConnectContractFormData, csrfToken: string) => Promise<void>
  isLoading: boolean
}
