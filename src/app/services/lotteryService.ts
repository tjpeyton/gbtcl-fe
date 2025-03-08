import { Lottery, LotteryDocument, PurchaseLotteryTickets, PurchaseLotteryTicketsDTO } from '@/lib/types/lottery'
import { GetAllLotteriesResponse } from '@/lib/types/lottery'
import { secondsToMilliseconds } from '@/lib/utils'   


const API_URL = '/api/lotteries/'

export const fetchAllLotteries = async (): Promise<GetAllLotteriesResponse> => {
  try {     
    const res = await fetch(API_URL)
    if (!res.ok) {
      throw new Error(`Failed to fetch lotteries: ${res.status} ${res.statusText}`)
    }
    return await res.json()   
  } catch (error: any) {
    throw new Error(`Network Error: Failed to fetch lotteries: ${error.message}`)
  }
}

export const saveLottery = async (lottery: Lottery, csrfToken: string) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(lottery),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      }
    })
    if (!res.ok) {
      throw new Error(`Failed to create lottery: ${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error: any) {
    throw new Error(`Network Error:Failed to create lottery: ${error.message}`)
  }
}

export const updateLotteryTickets = async (purchase: PurchaseLotteryTicketsDTO, csrfToken: string) => {
  try {
    const payload: PurchaseLotteryTickets = {
      buyerAddress: purchase.buyerAddress,
      count: purchase.count,
      contract: purchase.contract
    }

    const res = await fetch(API_URL + purchase.lotteryId + '/tickets', {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      }
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error: any) {
    throw new Error(error.message)    
  }
}

export const deleteLottery = async (contractAddress: string, lotteryId: string) => {
  try {
    const res = await fetch(API_URL + lotteryId + '?contract=' + contractAddress, {
      method: 'DELETE'
    })
    if (!res.ok) {
      throw new Error(`Failed to delete lottery: ${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error: any) {
    throw new Error(error.message)
  }
} 

export const filterActiveLotteries = (lotteries: LotteryDocument[] | Lottery[]) => {
  const currentDate = new Date()
  return lotteries.filter(
    (lottery: Lottery) => new Date(secondsToMilliseconds(lottery.expiration)) > currentDate
  )
}

export const filterExpiredLotteries = (lotteries: LotteryDocument[] | Lottery[]) => {
  const currentDate = new Date()
  return lotteries.filter(
    (lottery: Lottery) => new Date(secondsToMilliseconds(lottery.expiration)) < currentDate
  )
} 

export const isLotteryActive = (lottery: LotteryDocument | Lottery) => {
  const currentDate = new Date()
  return new Date(secondsToMilliseconds(lottery.expiration)) > currentDate
} 

export const userHasTickets = (lottery: LotteryDocument | Lottery, userAddress: string | null) => {
  return lottery.tickets?.some((address: string) => address === userAddress)
}

export const getUserTickets = (lottery: LotteryDocument | Lottery, userAddress: string | null) => {
  return lottery.tickets?.filter((address: string) => address.toUpperCase() === userAddress?.toUpperCase())
}
