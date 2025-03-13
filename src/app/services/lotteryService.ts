import { Lottery, LotteryDocument, LotteryUpdate, TicketPurchase } from '@/lib/types/lottery'
import { GetAllLotteriesResponse, ContractAbv } from '@/lib/types/lottery'
import { secondsToMilliseconds } from '@/lib/utils'   

const LOTTERIES_API_URL = '/api/lotteries/'
const CONTRACTS_API_URL = '/api/contracts/'


export const fetchAllLotteries = async (): Promise<GetAllLotteriesResponse> => {
  try {     
    const res = await fetch(LOTTERIES_API_URL)
    if (!res.ok) {
      throw new Error(`Failed to fetch lotteries: ${res.status} ${res.statusText}`)
    }
    return await res.json()   
  } catch (error: any) {
    throw new Error(`Network Error: Failed to fetch lotteries: ${error.message}`)
  }
}

export const fetchLottery = async (contract: ContractAbv, lotteryId: number): Promise<LotteryDocument> => {
  try {
    const res = await fetch(`${CONTRACTS_API_URL}/${contract.chainId}/${contract.address}/lotteries/${lotteryId}/`)

    if (!res.ok) {
      throw new Error(`Failed to fetch lottery: ${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error: any) {
    throw new Error(`Network Error: Failed to fetch lottery: ${error.message}`)
  }
} 

export const saveLottery = async (lottery: Lottery, csrfToken: string) => {
  try {
    const res = await fetch(LOTTERIES_API_URL, {
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

export const updateLottery = async (contract: ContractAbv, lotteryId: number, update: LotteryUpdate, csrfToken: string) => {
  try {
    const res = await fetch('/api/contracts/' + contract.chainId + '/' + contract.address + '/lotteries/' + lotteryId, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      }
    })
    if (!res.ok) {  
      throw new Error(`Failed to update lottery: ${res.statusText}`, { cause: res.status })
    }

    return await res.json()
  } catch (error: any) {
    throw new Error(`Network Error: Failed to update lottery: ${error.message}`, { cause: error.status })
  }
}

export const updateLotteryTickets = async (contract: ContractAbv, lotteryId: number, update: TicketPurchase, csrfToken: string) => {
  try {
    const res = await fetch('/api/contracts/' + contract.chainId + '/' + contract.address + '/lotteries/' + lotteryId + '/tickets', {
      method: 'PATCH',
      body: JSON.stringify(update),
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

export const deleteLottery = async (contract: ContractAbv, lotteryId: string) => {
  try {
    const res = await fetch('/api/contracts/' + contract.chainId + '/' + contract.address + '/lotteries/' + lotteryId, {
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
