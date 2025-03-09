import { Contract, ContractDocument } from '@/lib/types/contract'

import { getDb } from '../client'


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

const getContract = async (networkId: number, address: string) => {
  try {
    const collection = await getContractCollection()

    return collection.findOne({ 
      contract: { networkId: networkId, address: address.toLowerCase() } 
    })
  } catch (error) {
    throw new Error('Failed to get contract')
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

export {
  insertContract,
  getContract,
  getAllContracts,
} 
