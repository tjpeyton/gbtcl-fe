import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

import { LotteryDocument } from "@/lib/types/lottery"

import { StatusCircle } from "../StatusCircle"
import { FormDialog } from "../dialog/FormDialog"
import { PurchaseTicketForm } from "../forms/PurchaseTicketForm"


export interface LotteryCardProps {
  lottery: LotteryDocument
  isActive: boolean
  onBuyTickets?: () => void
}

export const LotteryCard = ({ lottery, isActive, onBuyTickets }: LotteryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2"> 
            <StatusCircle status={isActive ? 'active' : 'inactive'} />
            <span className="text-lg font-bold">Lottery #{lottery.lotteryId}</span>
            <span className="text-sm text-gray-500">{CHAIN_ID_TO_NETWORK[lottery.contract.chainId]}</span>
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
            <span>Tickets Sold: 0/{lottery.maxTickets}</span>
          </div>
          {isActive && 
            <div className="flex flex-col gap-2">
              <FormDialog
                form={
                  <PurchaseTicketForm 
                    onSubmit={onBuyTickets} 
                    isLoading={false} 
                  />
                }
                title="Buy Tickets"
                description="Buy tickets for the lottery"
                isOpen={false}
                setIsOpen={() => {}}
                trigger={<Button>Buy Tickets</Button>}  
              />
            </div>
          }
        </div>
      </CardContent>
    </Card>
  )
} 
