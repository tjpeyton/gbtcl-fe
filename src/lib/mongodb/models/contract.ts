import { Contract, ContractDocument } from '@/lib/types/contract'

import { getDb } from '../client'
import { ContractAbv } from '@/lib/types/lottery'


const getContractCollection = async () => {
  try {
    const db = await getDb('gbtcl')
    return db.collection<Contract>('contract')
  } catch (error) {
    throw new Error('Failed to get contract collection')
  }
}

const insertContract = async (contract: Contract) => {
  const contracts = await getContractCollection()

  // Check if contract exists first
  const existingContract : ContractDocument | null = await contracts.findOne({
    address: contract.address.toLowerCase()
  })
  if (existingContract) {
    throw new Error('Contract already exists for this network', { cause: 409 })
  }
        
  return contracts.insertOne({
    ...contract
  })
}

const getContract = async (chainId: string, address: string) => {
  try {
    const filter = { chainId: chainId, address: address.toLowerCase() }
    const collection = await getContractCollection()

    const result = await collection.findOne(filter)
    if (!result) {
      throw new Error('Contract not found', { cause: 404 })
    }
    return result
  } catch (error: any) {
    throw new Error('Failed to get contract: ' + error.message, { cause: error.cause })
  }
} 

const getAllContracts = async () => {
  try {
    const collection = await getContractCollection()
    return await collection.find().sort({ createdAt: -1 }).toArray() 
  } catch (error) {
    throw new Error('Failed to get all contracts')
  }
} 

const deleteContract = async (contract: ContractAbv) => {
  try {
    const collection = await getContractCollection()
    const result = await collection.findOneAndDelete({ 
      chainId: String(contract.chainId), 
      address: contract.address.toLowerCase() 
    })
    if(!result) { 
      throw new Error('Contract not found', { cause: 404 })
    }
    return result
  } catch (error: any) {
    throw new Error('Failed to delete contract: ' + error.message, { cause: error.cause })
  }
}


export {
  insertContract,
  getContract,
  getAllContracts,
  deleteContract
} 
