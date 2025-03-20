
import { ObjectId } from 'mongodb'

import { z } from 'zod'


type AbiParameter = {
  name: string
  type: string
  indexed?: boolean
}

type AbiFunction = {
  type: 'function'
  name: string
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable'
  inputs: AbiParameter[]
  outputs: AbiParameter[]
}

type AbiEvent = {
  type: 'event'
  name: string
  inputs: AbiParameter[]
  anonymous?: boolean
}

type AbiConstructor = {
  type: 'constructor'
  stateMutability: 'nonpayable' | 'payable'
  inputs: AbiParameter[]
}

type AbiFallback = {
  type: 'fallback'
  stateMutability: 'nonpayable' | 'payable'
}

type AbiReceive = {
  type: 'receive'
  stateMutability: 'payable'
}

type Abi = (AbiFunction | AbiEvent | AbiConstructor | AbiFallback | AbiReceive)[];

type ContractDocument = {
    _id: ObjectId,
    address: string
    abi: Abi
    chainId: string
    createdAt: Date,
    name?: string
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
  type Contract,
  type Abi,
  type AbiFunction,
  type AbiEvent,
  type AbiConstructor,
  type AbiFallback,
  type AbiReceive,
  type AbiParameter   
}
