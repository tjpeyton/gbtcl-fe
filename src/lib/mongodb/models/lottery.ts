import { Lottery, PurchaseLotteryTicketsDTO } from '@/lib/types/lottery'

import { getDb } from '../client'


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

const getLottery = async (lotteryId: number) => {
  try {
    const collection = await getLotteryCollection()
    return collection.findOne({ lotteryId })
  } catch (error) {
    throw new Error('Failed to retrieve lottery document')
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

const updateLotteryTickets = async (purchase: PurchaseLotteryTicketsDTO) => {
  try {
    const collection = await getLotteryCollection()

    const result = await collection.updateOne({ 
      lotteryId: purchase.lotteryId,
      contract: {
        address: purchase.contract.address,
        chainId: purchase.contract.chainId
      }
    }, { $push: { tickets: purchase.buyerAddress } })

    if (result.modifiedCount < 0) {
      console.error('No documents were updated')
      throw new Error('Ticket Purchase not documented off chain')
    }

    return result
  } catch (error) {
    throw new Error(`Failed to update lottery tickets: Ticket Purchase not documented off chain - ${error}`)
  }
}

export {
  insertLottery,
  getLottery,
  getAllLotteries,
  updateLotteryTickets
}
