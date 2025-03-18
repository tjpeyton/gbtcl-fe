'use client'

import { LotteryDocument } from '@/lib/types/lottery'
import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds, getLotteryStatus } from '@/lib/utils'

import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ContractAddress } from '@/components/ContractAdress'


export interface LotteryDetailsCardProps {
  lottery: LotteryDocument
}


const LotteryDetailsCard = ({ lottery }: LotteryDetailsCardProps) => {

  return (
    <Card className='md:col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Lottery Details</span>
          <Badge variant={
            getLotteryStatus(lottery)
              .toLowerCase() as 'open' | 'drawing' | 'winnerSelected' | 'completed' | 'cancelled'
          }>
            {getLotteryStatus(lottery)}
          </Badge>
        </CardTitle>
        <CardDescription>
          Lottery ID: {lottery.lotteryId} - Created {formatUnixTimestampFromSeconds(lottery.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">
            Contract Address
          </div>
          <div className="flex items-center gap-2">
            <ContractAddress address={lottery.contract.address} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Network</div>
            <div className="text-lg font-semibold">
              {lottery ? CHAIN_ID_TO_NETWORK[lottery.contract.chainId] : <Skeleton className="h-6 w-24" />}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Pool</div>
            <div className="text-lg font-semibold">
              {lottery ? (lottery.tickets?.length || 0) * (lottery.ticketPrice || 0) : <Skeleton className="h-6 w-24" />}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Operator Commission</div>
            <div className="text-lg font-semibold">
              {lottery ? lottery.operatorCommissionPercentage + '%' : <Skeleton className="h-6 w-24" />}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Ticket Price</div>
            <div className="text-lg font-semibold">
              {lottery ? lottery.ticketPrice : <Skeleton className="h-6 w-24" />}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Tickets Sold</div>
            <div className="text-lg font-semibold">
              {lottery ? 
                (lottery.tickets?.length || 0) + '/' + (lottery.maxTickets || 0) : 
                <Skeleton className="h-6 w-24" />}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Winner</div>
            <div className="text-lg font-semibold">
              -
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LotteryDetailsCard
