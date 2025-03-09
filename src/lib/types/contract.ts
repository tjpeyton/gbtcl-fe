
import { ObjectId } from 'mongodb'

import { z } from 'zod'

type ContractDocument = {
    _id: ObjectId,
    address: string
    abi: any
    chainId: string
    createdAt: Date
}

type GetAllContractsResponse = {
    contracts: ContractDocument[]
}   

type Contract = Omit<ContractDocument, '_id'>

const connectContractSchema = z.object({
  contractAddress: z.string().min(1, { message: 'Contract address is required' }),
  chain: z.string().min(1, { message: 'Chain is required' })
})

export {
  connectContractSchema,
  type ContractDocument,
  type GetAllContractsResponse,
  type Contract
}
