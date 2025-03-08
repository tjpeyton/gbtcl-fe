import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'

import { updateContractLotteries } from '@/lib/mongodb/models/contract'
import { getAllLotteries, insertLottery } from '@/lib/mongodb/models/lottery'
import { createLotterySchema, Lottery } from '@/lib/types'
   

export async function GET(
  request: NextRequest,
  { searchParams }: { searchParams: URLSearchParams } 
) {
  try { 
    await adminMiddleware(request)  

    if(!searchParams) {
      const lotteries = await getAllLotteries()
      return NextResponse.json({ lotteries }, { status: 200 })
    }

    // Create filter type
    const contract = searchParams.get('contract')

    if(contract) {
      const lotteries = await getAllLotteries(contract)
      return NextResponse.json({ lotteries }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Incorrect query format' }, { status: 200 })
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
