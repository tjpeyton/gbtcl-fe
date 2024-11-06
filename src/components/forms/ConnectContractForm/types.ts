import { z } from 'zod'
import { contractSchema } from './schema'


export type FormData = z.infer<typeof contractSchema>

export interface ConnectContractFormProps {
  onSubmit: (data: FormData, csrfToken: string) => Promise<void>
  isLoading?: boolean
}
