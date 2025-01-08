import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'

import { updateContractLotteries } from '@/lib/mongodb/models/contract'
import { getAllLotteries, getLottery, insertLottery } from '@/lib/mongodb/models/lottery'
import { createLotterySchema, Lottery } from '@/lib/types'


export async function GET(request: NextRequest) {
  try { 
    await adminMiddleware(request)  

    const query = request.nextUrl.searchParams  
    const lotteryId = query.get('id')    
    if(lotteryId) {
      const lottery = await getLottery(Number(lotteryId))
      return NextResponse.json({ lottery }, { status: 200 })
    } else {
      const lotteries  = await getAllLotteries()
      return NextResponse.json({ lotteries }, { status: 200 })
    }
  } catch (error) {
    console.error('Error fetching lotteries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}   

export async function POST(request: NextRequest) {
  try {
    await adminMiddleware(request)

    const body = await request.json()
    const result = createLotterySchema.safeParse(body)
    if (!result.success) { 
      return NextResponse.json({ error: result.error.issues }, { status: 400 })
    }

    const lottery: Lottery = {
      ...result.data,
      tickets: []
    }
    const { insertedId } = await insertLottery(lottery)

    await updateContractLotteries(lottery.contract.address, insertedId.toString())

    return NextResponse.json(
      { message: 'Lottery created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating lottery:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
