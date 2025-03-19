import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'
import { getLottery, deleteLottery, updateLottery } from '@/lib/mongodb/models/lottery'
import { LotteryUpdate } from '@/lib/types'


export async function GET(
  request: NextRequest,
  { params }: { params: { networkId: string, address: string, id: string } }
) {
  try { 
    await adminMiddleware(request)  
    
    const lottery = await getLottery(Number(params.networkId), params.address, Number(params.id))

    return NextResponse.json(lottery, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching lotteries:', error)
    return NextResponse.json(
      { error: error.message }, 
      { status: error.cause }
    )
  }
} 

// need to verify csrf token middleware is firing here
export async function PATCH(
  request: NextRequest, 
  { params }: { params: { networkId: string, address: string, id: string } }
) {
  try {
    await adminMiddleware(request)

    const body: LotteryUpdate = await request.json()
    if (!Object.keys(body).length) {
      return new Response(JSON.stringify({ error: 'At least one field is required' }), { status: 400 })
    }

    const updatedLottery = await updateLottery({ 
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


export async function DELETE(
  request: NextRequest,
  { params }: { params: { networkId: string, address: string, id: string } },
) {
  try {
    await adminMiddleware(request)

    await deleteLottery(
      { chainId: Number(params.networkId), address: params.address }, 
      Number(params.id)
    )

    return NextResponse.json(
      { success: true, message: 'Lottery deleted successfully' }, 
      { status: 200 }
    )
  } catch (error: any) { 
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: error.cause }
    )
  }
}
