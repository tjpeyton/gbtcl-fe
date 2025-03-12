'use client'

import { useState } from 'react'
import { InfoIcon, TicketIcon } from 'lucide-react' 

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@radix-ui/react-tooltip'
import { PurchaseTicketFormData } from '@/components/forms/PurchaseTicketForm/types'
import CountdownDisplay from '@/components/CountdownDisplay'

import useCountdown from '@/app/hooks/useCountdown'
import { getUserTickets, userHasTickets } from '@/app/services/lotteryService'
import { useWalletContext, WalletContext } from '@/app/contexts/WalleContext'  

import { CHAIN_ID_TO_NETWORK, formatUnixTimestampFromSeconds } from '@/lib/utils'
import { LotteryDocument } from'@/lib/types/lottery' 


export interface LotteryCardProps {
  lottery: LotteryDocument
  isBuyingTickets?: boolean
  onBuyTickets?: (
    data: PurchaseTicketFormData, 
    csrfToken: string, 
    lottery: LotteryDocument
  ) => Promise<void>
}


const LotteryCard = ({ lottery, isBuyingTickets, onBuyTickets }: LotteryCardProps) => {
  const [targetDate, setTargetDate] = useState(formatUnixTimestampFromSeconds(lottery.expiration))
  const [days, hours, minutes, seconds] = useCountdown(targetDate)
  const {
    state: { address },
  } = useWalletContext() as WalletContext

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center gap-2'> 
            <span className='text-lg font-bold'>Lottery #{lottery.lotteryId}</span>
            <span className='text-sm text-gray-500'>
              {CHAIN_ID_TO_NETWORK[lottery.contract.chainId]}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='ml-auto'>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent className='text-sm bg-white p-2 ml-auto'>
                  <p>Created At: {formatUnixTimestampFromSeconds(lottery.createdAt)}</p>
                  <p>Tickets Sold: {lottery.tickets?.length || 0 }/{lottery.maxTickets}</p>
                </TooltipContent>
              </Tooltip>  
            </TooltipProvider>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-row gap-2 justify-center'>
          <div className={
            `flex flex-col gap-1 border-solid border-2 border-black rounded-md p-3 w-1/2 
            ${userHasTickets(lottery, address) ? 'bg-green-500' : 'bg-white'}`
          }>
            <span className="text-md">Total Pool:</span>
            <span className="text-md font-bold">
              {lottery.tickets?.length || 0 * lottery.ticketPrice} wei
            </span>
          </div>
          <div className={
            `flex flex-col gap-1 border-solid border-2 border-black 
            rounded-md p-3 w-2/3 ${userHasTickets(lottery, address) ? 'bg-green-500' : 'bg-white'}`
          }>
            <span className='text-md'>Tickets Remaining:</span>  
            <span className='text-md font-bold'>{lottery.maxTickets - (lottery.tickets?.length || 0)}</span>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='flex flex-col gap-2 pt-4 w-100'>
            <span className='text-lg font-bold'>Next Draw</span>
            <div className='grid md:grid-cols-4 gap-4'> 
              <CountdownDisplay value={days} label='days' />
              <CountdownDisplay value={hours} label='hours' />
              <CountdownDisplay value={minutes} label='minutes' />
              <CountdownDisplay value={seconds} label='seconds' />
            </div>
            <div className='flex flex-row items-center justify-center gap-1 pt-3'>
              <TicketIcon className='w-4 h-4 text-yellow-500' />    
              <p className='text-md text-black font-bold'>
                You have {getUserTickets(lottery, address)?.length || 0} ticket(s) for this lottery
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 

export default LotteryCard
