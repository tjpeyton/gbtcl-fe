import { ObjectId } from 'mongodb'
import { z } from 'zod'

type ContractAbv = {
    address: string,
    chainId: number
}

type LotteryDocument = {
    _id: ObjectId
    contract: ContractAbv,
    lotteryId: number, 
    ticketPrice: number,
    maxTickets: number,
    expiration: number,
    operatorCommissionPercentage: number,
    createdAt: number,
    tickets?: string[],
    winnerSelectedAt?: string,
    winnerAddress?: string
}

type Lottery = Omit<LotteryDocument, '_id'>

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

const purchaseLotteryTicketSchema = z.object({
  buyerAddress: z.string().min(1),
  count: z.number().min(1),
  contract: z.object({
    address: z.string().min(1),
    chainId: z.number().min(1),
  }),
})

const purchaseLotteryTicketDTOSchema = purchaseLotteryTicketSchema.extend({
  lotteryId: z.number().min(1),
})

type PurchaseLotteryTickets = z.infer<typeof purchaseLotteryTicketSchema>
type PurchaseLotteryTicketsDTO = z.infer<typeof purchaseLotteryTicketDTOSchema>

export {  
  type LotteryDocument,
  type GetAllLotteriesResponse,
  type Lottery,
  createLotterySchema,
  purchaseLotteryTicketSchema,
  purchaseLotteryTicketDTOSchema,
  type PurchaseLotteryTickets,
  type PurchaseLotteryTicketsDTO,
  type ContractAbv
}
