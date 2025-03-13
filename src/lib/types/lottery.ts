import { ObjectId } from 'mongodb'
import { z } from 'zod'

import { RequireAtLeastOne } from './utils'


type ContractAbv = {
  address: string,
  chainId: number
}

enum LotteryStatus {
  OPEN = 'open',
  DRAWING = 'drawing',
  WINNER_SELECTED = 'winner_selected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

type LotteryDocument = {
  _id: ObjectId
  contract: ContractAbv
  lotteryId: number
  ticketPrice: number
  maxTickets: number
  expiration: number
  operatorCommissionPercentage: number
  createdAt: number
  status: LotteryStatus
  tickets?: string[]
  winnerSelectedAt?: string
  winnerAddress?: string
}

type Lottery = Omit<LotteryDocument, '_id'>
type LotteryUpdate = RequireAtLeastOne<{
  status?: LotteryStatus,  
  winnerAddress?: string,
  winnerSelectedAt?: string
}>

type TicketPurchase = {
  buyerAddress: string,
  count: number,
}

const ticketPurchaseSchema = z.object({
  buyerAddress: z.string().min(1),
  count: z.number().min(1)
})  

type GetAllLotteriesResponse = {
  lotteries: LotteryDocument[]
}   

const createLotterySchema = z.object({
  contract: z.object({
    address: z.string().min(1),
    chainId: z.number().min(1)
  }),
  lotteryId: z.number().min(1),   
  ticketPrice: z.number().min(100),
  maxTickets: z.number().min(1),
  expiration: z.number().min(1000),
  operatorCommissionPercentage: z.number().min(1).max(50),
  createdAt: z.number().min(1),
})


export {  
  type LotteryDocument,
  type GetAllLotteriesResponse,
  type Lottery,
  createLotterySchema,
  type ContractAbv,
  LotteryStatus,
  type LotteryUpdate,
  type TicketPurchase,
  ticketPurchaseSchema
}
