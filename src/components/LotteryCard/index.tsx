'use client'

import { useState } from "react"
import { InfoIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusCircle } from "@/components/StatusCircle"
import { PurchaseTicketFormData } from "@/components/forms/PurchaseTicketForm/types"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@radix-ui/react-tooltip"

import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from "@/lib/utils"
import { LotteryDocument } from "@/lib/types/lottery"


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
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
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
            <span>Total pool:</span>
            <span>{lottery.tickets.length * lottery.ticketPrice} wei</span>
          </div>
          <div className="flex flex-col gap-1 border-solid border-2 border-black rounded-md p-3 w-1/2">
            <span>Tickets left:</span>  
            <span>{lottery.maxTickets - lottery.tickets.length}</span>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-1 p-3 w-100">
            <span>Next Draw</span>
            
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
