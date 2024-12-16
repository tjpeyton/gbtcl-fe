import { Lottery, LotteryDocument } from "@/lib/types/lottery"
import { GetAllLotteriesResponse } from "@/lib/types/lottery"
import { secondsToMilliseconds } from "@/lib/utils"


const API_URL = '/api/lottery/'

export const fetchAllLotteries = async () : Promise<GetAllLotteriesResponse> => {
    try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Failed to fetch lotteries')

        return await res.json()   
    } catch (error: any) {
        throw error
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
        if (!res.ok) throw new Error('Failed to create lottery')

        return await res.json()
    } catch (error: any) {
        throw error
    }
}
