import { Contract, ContractDocument } from "@/lib/types/contract"

import { getDb } from "../client"


const getContractCollection = async () => {
    try {
        const db = await getDb('gbtcl')
        return db.collection<Contract>('contract')
    } catch (error) {
        throw new Error('Failed to get contract collection')
    }
}

export const insertContract = async (contract: Contract) => {
    try {
        const contracts = await getContractCollection()

        // Check if contract exists first
        const existingContract : ContractDocument | null = await contracts.findOne({
            address: contract.address.toLowerCase()
        })
        if (existingContract) {
            throw new Error('Contract already exists for this network')
        }
        
        return contracts.insertOne({
            ...contract
        })
    } catch (error) {
        throw new Error('Failed to insert contract')
    }
}

export const getContract = async (address: string) => {
    try {
        const collection = await getContractCollection()

        return collection.findOne({ address: address.toLowerCase() })
    } catch (error) {
        throw new Error('Failed to get contract')
    }
} 

export const getAllContracts = async () => {
    try {
        const collection = await getContractCollection()
        return await collection.find().sort({ createdAt: -1 }).toArray() 
    } catch (error) {
        throw new Error('Failed to get all contracts')
    }
} 

export const updateContractLotteries = async (address: string, lotteryId: string) => {
    try {
        const collection = await getContractCollection()
        return collection.updateOne({ address: address }, { $push: { lottery: lotteryId } })
    } catch (error) {
        throw new Error('Failed to update contract lotteries')
    }
} 
