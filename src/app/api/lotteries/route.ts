import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'

import { getAllLotteries, insertLottery } from '@/lib/mongodb/models/lottery'
import { createLotterySchema, Lottery, LotteryStatus } from '@/lib/types'
   

export async function GET(request: NextRequest) {
  try { 
    await adminMiddleware(request)  

    const lotteries = await getAllLotteries()
    return NextResponse.json({ lotteries }, { status: 200 })
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
      tickets: [],
      status: LotteryStatus.OPEN
    }

    await insertLottery(lottery)

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
