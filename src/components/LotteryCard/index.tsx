'use client'

import { useState } from "react"
import { Plus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusCircle } from "@/components/StatusCircle"
import { FormDialog } from "@/components/dialog/FormDialog"
import { PurchaseTicketForm } from "@/components/forms/PurchaseTicketForm"
import { PurchaseTicketFormData } from "@/components/forms/PurchaseTicketForm/types"

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
            <StatusCircle status={onBuyTickets ? 'active' : 'inactive'} />
            <span className="text-lg font-bold">Lottery #{lottery.lotteryId}</span>
            <span className="text-sm text-gray-500">
              {CHAIN_ID_TO_NETWORK[lottery.contract.chainId]}
            </span>
            { onBuyTickets &&
              <div className="ml-auto">
                <FormDialog
                  form={
                    <PurchaseTicketForm 
                      onSubmit={(data, csrfToken) => onBuyTickets ? onBuyTickets(data, csrfToken, lottery) : Promise.resolve()} 
                      isLoading={isBuyingTickets || false} 
                    />
                  }
                  title="Buy Tickets"
                  description="Buy tickets for the lottery"
                  isOpen={ticketDialogOpen}
                  setIsOpen={setTicketDialogOpen}
                  trigger={
                    <Button icon={<Plus/>}>
                      Buy Tickets {lottery.ticketPrice} wei 
                    </Button>
                  }  
                />
              </div>
            }
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-24">
          <div className="flex flex-col gap-2">
            <span>Created At: {formatUnixTimestampFromSeconds(lottery.createdAt)}</span>
            <span>Ticket Sales End: {formatUnixTimestampFromSeconds(lottery.expiration)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>Tickets Sold: {lottery.tickets.length}/{lottery.maxTickets}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
