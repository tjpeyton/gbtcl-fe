import { NextRequest, NextResponse } from 'next/server'

import { TicketPurchase, ticketPurchaseSchema } from '@/lib/types/lottery'
import { updateLotteryTickets } from '@/lib/mongodb/models/lottery'

// need to verify csrf token middleware is firing here
export async function PATCH(
  request: NextRequest, 
  { params }: { params: { networkId: string, address: string, id: string } }
) {
  try {
    //validate body
    const body: TicketPurchase = await request.json()
    const result = ticketPurchaseSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 })
    }
    
    const updatedLottery = await updateLotteryTickets({ 
      chainId: Number(params.networkId),
      address: params.address
    }, Number(params.id), body)

    console.log('updatedLottery', updatedLottery) 

    return NextResponse.json(
      { message: 'Tickets updated successfully' }, 
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error updating tickets:', error.message)
    return NextResponse.json(
      { error: error.message }, 
      { status: error.cause }
    )
  }
}
