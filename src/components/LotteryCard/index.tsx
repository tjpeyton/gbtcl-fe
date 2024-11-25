import { CHAIN_ID_TO_NETWORK, formatUnixTimestamp } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

import { Lottery } from "@/app/api/lottery/route"


export interface LotteryCardProps {
  lottery: Lottery
  isActive: boolean
}

export const LotteryCard = ({ lottery, isActive }: LotteryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2"> 
            <span className="text-lg font-bold">Lottery # {lottery.lotteryId}</span>
            <span className="text-sm text-gray-500">{CHAIN_ID_TO_NETWORK[lottery.contract.chainId]}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span>Created At: {formatUnixTimestamp(lottery.createdAt)}</span>
          <span>Expiry: {formatUnixTimestamp(lottery.createdAt + lottery.expiration)}</span>
          <span>Max Tickets: {lottery.maxTickets}</span>
          <span>Ticket Price: {lottery.ticketPrice}</span>
        </div>
      </CardContent>
    </Card>
  )
} 
