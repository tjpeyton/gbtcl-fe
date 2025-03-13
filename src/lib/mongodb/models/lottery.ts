import { getDb } from '../client'

import { Lottery, LotteryUpdate, TicketPurchase } from '@/lib/types/lottery'
import { ContractAbv } from '@/lib/types/lottery'


const getLotteryCollection = async () => {
  try {
    const db = await getDb('gbtcl')
    return db.collection<Lottery>('lottery')
  } catch (error) {
    throw new Error('Failed to retrieve lottery collection')
  }
}

const insertLottery = async (lottery: Lottery) => {
  try {
    const collection = await getLotteryCollection()
    return collection.insertOne(lottery)
  } catch (error) {
    throw new Error('Failed to insert lottery document')
  }
}

const getLottery = async (chainId: number, address: string, lotteryId: number) => {
  try {
    const filter = { 
      lotteryId: lotteryId, 
      'contract.chainId': chainId, 
      'contract.address': address 
    }

    const collection = await getLotteryCollection() 
    const result = await collection.findOne(filter)

    if (!result) {
      throw new Error('Lottery not found', { cause: 404 })
    }

    return result
  } catch (error: any) {
    throw new Error(error.message, { cause: error.cause })
  } 
}

const getLotteriesByContract = async (chainId: number, address: string) => {
  try {
    const filter = { 
      'contract.chainId': chainId, 
      'contract.address': address 
    }

    const collection = await getLotteryCollection()
    return collection.find(filter).sort({ createdAt: -1 }).toArray()
  } catch (error) {
    throw new Error('Failed to retrieve all lottery documents')
  }
}

const getAllLotteries = async () => {
  try {
    const collection = await getLotteryCollection()

    return collection.find().sort({ createdAt: -1 }).toArray()
  } catch (error) {   
    throw new Error('Failed to retrieve all lottery documents')
  }
}

const updateLottery = async (contract: ContractAbv, lotteryId: number, update: LotteryUpdate) => {
  try {
    const collection = await getLotteryCollection()

    const result = await collection.findOneAndUpdate({ 
      lotteryId: lotteryId,
      'contract.chainId': contract.chainId,
      'contract.address': contract.address
    }, 
    { $set: { ...update } }, 
    { returnDocument: 'after' })

    if (!result) {
      throw new Error('Lottery not found', { cause: 404 })
    }

    return result
  } catch (error: any) {
    throw new Error(error.message, { cause: error.cause })
  }
}

const updateLotteryTickets = async (contract: ContractAbv, lotteryId: number, update: TicketPurchase) => {
  try {
    const collection = await getLotteryCollection()
    const result = await collection.findOneAndUpdate({ 
      lotteryId: lotteryId,
      'contract.chainId': contract.chainId,
      'contract.address': contract.address
    },
    { $push: { tickets: { $each: Array(update.count).fill(update.buyerAddress) } } },
    { returnDocument: 'after' })

    if (!result) {
      throw new Error('Lottery not found', { cause: 404 })
    }

    return result
  } catch (error: any) {
    throw new Error(error.message, { cause: error.cause })
  }
}

const deleteLottery = async (contract: ContractAbv, lotteryId: number) => {
  try {
    const collection = await getLotteryCollection()
    const result = await collection.findOneAndDelete({ 
      lotteryId: lotteryId,
      contract: {
        address: contract.address,
        chainId: contract.chainId
      }
    })

    if (!result) {
      throw new Error('Lottery not found', { cause: 404 })
    }

    return result
  } catch (error: any) {
    throw new Error(error.message, { cause: error.cause })
  }
}

export {
  insertLottery,
  getLottery,
  getAllLotteries,
  getLotteriesByContract,
  updateLotteryTickets,
  updateLottery,
  deleteLottery
}
