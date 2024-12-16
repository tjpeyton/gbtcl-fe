
import { ObjectId } from "mongodb"

import { z } from "zod"

export type ContractDocument = {
    _id: ObjectId,
    address: string
    abi: any
    chainId: string
    lottery: string[]
    createdAt: Date
}

export type GetAllContractsResponse = {
    contracts: ContractDocument[]
}   

export type Contract = Omit<ContractDocument, '_id'>

export const connectContractSchema = z.object({
    contractAddress: z.string().min(1, { message: "Contract address is required" }),
    chain: z.string().min(1, { message: "Chain is required" })
})
