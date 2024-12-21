import { Lottery, PurchaseLotteryTickets, PurchaseLotteryTicketsDTO } from "@/lib/types/lottery"

import { getDb } from "../client"


const getLotteryCollection = async () => {
    try {
        const db = await getDb('gbtcl')
        return db.collection<Lottery>('lottery')
    } catch (error) {
        throw new Error('Failed to get lottery collection')
    }
}

export const insertLottery = async (lottery: Lottery) => {
    try {
        const collection = await getLotteryCollection()
        return collection.insertOne(lottery)
    } catch (error) {
        throw new Error('Failed to insert lottery')
    }
}

export const getLottery = async (lotteryId: number) => {
    try {
        const collection = await getLotteryCollection()
        return collection.findOne({ lotteryId })
    } catch (error) {
        throw new Error('Failed to get lottery')
    }
}

export const getAllLotteries = async () => {
    try {
        const collection = await getLotteryCollection()
        return collection.find().sort({ createdAt: -1 }).toArray()
    } catch (error) {   
        throw new Error('Failed to get all lotteries')
    }
}

export const updateLotteryTickets = async (purchase: PurchaseLotteryTicketsDTO) => {
    try {
        const collection = await getLotteryCollection()
        return collection.updateOne({ 
            lotteryId: purchase.lotteryId,
            contract: {
                address: purchase.contract.address,
                chainId: purchase.contract.chainId
            }
        }, { $inc: { ticketsBought: purchase.count } })

    } catch (error) {
        throw new Error('Failed to update lottery tickets')
    }
}
