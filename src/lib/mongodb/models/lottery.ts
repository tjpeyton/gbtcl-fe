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

const getAllLotteries = async (contractAddress?: string) => {
  try {
    const filter = contractAddress ? { contract: { address: contractAddress } } : {}
    
    const collection = await getLotteryCollection()
    return collection.find(filter).sort({ createdAt: -1 }).toArray()
  } catch (error) {   
    throw new Error('Failed to retrieve all lottery documents')
  }
}

const updateLotteryTickets = async (purchase: PurchaseLotteryTicketsDTO) => {
  try {
    const collection = await getLotteryCollection()

    const result = await collection.findOneAndUpdate({ 
      lotteryId: purchase.lotteryId,
      contract: {
        address: purchase.contract.address,
        chainId: purchase.contract.chainId
      }
    }, 
    { $push: { tickets: purchase.buyerAddress } }, 
    { returnDocument: 'after' })

    if (!result) {
      console.error('No documents were updated')
      throw new Error('Ticket Purchase not documented off chain')
    }

    return result
  } catch (error) {
    throw new Error(`Failed to update lottery tickets: Ticket Purchase not documented off chain - ${error}`)
  }
}

const updateLottery = async (lottery: Partial<Lottery>) => {
  try {
    const collection = await getLotteryCollection()
    return collection.findOneAndUpdate(
      { 
        lotteryId: lottery.lotteryId,
        contract: {
          address: lottery.contract?.address,
          chainId: lottery.contract?.chainId
        }
      },
      { $set: { ...lottery } },
      { returnDocument: 'after' }
    )
  } catch (error) {
    throw new Error('Failed to update lottery document')
  }
}
export {
  insertLottery,
  getLottery,
  getAllLotteries,
  updateLotteryTickets,
  updateLottery 
}
