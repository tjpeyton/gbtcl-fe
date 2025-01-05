'use client'

import { useState } from "react"
import { InfoIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@radix-ui/react-tooltip"
import { StatusCircle } from "@/components/StatusCircle"
import { PurchaseTicketFormData } from "@/components/forms/PurchaseTicketForm/types"
import { CountdownDisplay } from "@/components/CountdownDisplay"

import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from "@/lib/utils"
import { LotteryDocument } from "@/lib/types/lottery"
import useCountdown from "@/app/hooks/useCountdown"


export interface LotteryCardProps {
  lottery: LotteryDocument
  isBuyingTickets?: boolean
  onBuyTickets?: (
    data: PurchaseTicketFormData, 
    csrfToken: string, 
    lottery: LotteryDocument
  ) => Promise<void>
}

export const LotteryCard = ({ lottery, isBuyingTickets, onBuyTickets }: LotteryCardProps) => {
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false)
  const [targetDate, setTargetDate] = useState(formatUnixTimestampFromSeconds(lottery.expiration))
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2"> 
            <StatusCircle status={'active'} />
            <span className="text-lg font-bold">Lottery #{lottery.lotteryId}</span>
            <span className="text-sm text-gray-500">
              {CHAIN_ID_TO_NETWORK[lottery.contract.chainId]}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="ml-auto">
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent className="text-sm bg-white p-2 ml-auto">
                  <p>Created At: {formatUnixTimestampFromSeconds(lottery.createdAt)}</p>
                  <p>Tickets Sold: {lottery.tickets.length}/{lottery.maxTickets}</p>
                </TooltipContent>
              </Tooltip>  
            </TooltipProvider>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-1 border-solid border-2 border-black rounded-md p-3 w-1/2">
            <span className="text-md">Total pool:</span>
            <span className="text-md font-bold">{lottery.tickets.length * lottery.ticketPrice} wei</span>
          </div>
          <div className="flex flex-col gap-1 border-solid border-2 border-black rounded-md p-3 w-1/2">
            <span className="text-md">Tickets left:</span>  
            <span className="text-md font-bold">{lottery.maxTickets - lottery.tickets.length}</span>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-2 pt-4 w-100">
            <span className="text-lg font-bold">Next Draw</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> 
              <CountdownDisplay value={days} label="days" />
              <CountdownDisplay value={hours} label="hours" />
              <CountdownDisplay value={minutes} label="minutes" />
              <CountdownDisplay value={seconds} label="seconds" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
