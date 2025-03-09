import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'
import { getLottery, deleteLottery } from '@/lib/mongodb/models/lottery'


export async function GET(
  request: NextRequest,
  { params }: { params: { networkId: string, address: string, id: string } }
) {
  try { 
    await adminMiddleware(request)  
    
    const lottery = await getLottery(Number(params.networkId), params.address, Number(params.id))
    return NextResponse.json({ lottery }, { status: 200 })
  } catch (error) {
    console.error('Error fetching lotteries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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