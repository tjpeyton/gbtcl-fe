import { NextRequest, NextResponse } from 'next/server'

import { PurchaseLotteryTicketsDTO, purchaseLotteryTicketSchema } from '@/lib/types/lottery'
import { updateLotteryTickets } from '@/lib/mongodb/models/lottery'

// need to verify csrf token middleware is firing here
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    //validate body
    const body: PurchaseLotteryTicketsDTO = await request.json()
    const result = purchaseLotteryTicketSchema.safeParse(body)
    if (!result.success) { 
      console.error('Invalid request body:', result.error.issues)
      return NextResponse.json(
        { error: result.error.issues }, 
        { status: 400 }
      )
    }
    
    const updatedLottery = await updateLotteryTickets({
      ...result.data, 
      lotteryId: Number(params.id)
    })

    console.log('updatedLottery', updatedLottery) 

    return NextResponse.json(
      { message: 'Tickets updated successfully' }, 
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating tickets:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
