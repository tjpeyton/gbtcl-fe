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
  isActive: boolean
  onBuyTickets?: () => void
}

export const LotteryCard = ({ lottery, isActive, onBuyTickets }: LotteryCardProps) => {
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false)

  const handleBuyTickets = async (data: PurchaseTicketFormData, csrfToken: string) => {
    console.log('Buy Tickets', data, csrfToken)

  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2"> 
            <StatusCircle status={isActive ? 'active' : 'inactive'} />
            <span className="text-lg font-bold">Lottery #{lottery.lotteryId}</span>
            <span className="text-sm text-gray-500">
              {CHAIN_ID_TO_NETWORK[lottery.contract.chainId]}
            </span>
            {isActive && 
              <div className="ml-auto">
                <FormDialog
                  form={
                    <PurchaseTicketForm 
                      onSubmit={handleBuyTickets} 
                      isLoading={false} 
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
