'use client'

import { Copy, ExternalLink, Link } from 'lucide-react' 

import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { TooltipContent, TooltipTrigger, TooltipProvider, Tooltip } from '../ui/tooltip'
import { Button } from '../ui/button'

import { LotteryDocument } from '@/lib/types/lottery'
import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'


export interface LotteryDetailsCardProps {
  lottery: LotteryDocument
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}


const LotteryDetailsCard = ({ lottery }: LotteryDetailsCardProps) => {

  return (
    <Card className='md:col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Lottery Details</span>
          <Badge variant="open">Open</Badge>
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
            {lottery ? (
              <>
                <code className="rounded bg-muted px-2 py-1 text-sm">{lottery.contract.address}</code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(lottery.contract.address)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy address</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://etherscan.io/address/${lottery.contract.address}`}
                        target="_blank"
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View on Etherscan</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View on Etherscan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <Skeleton className="h-6 w-full" />
            )}
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
