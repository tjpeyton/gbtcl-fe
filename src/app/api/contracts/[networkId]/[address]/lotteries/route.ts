import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'
import { getLotteriesByContract } from '@/lib/mongodb/models/lottery'


export async function GET(
  request: NextRequest,
  { params }: { params: { networkId: string, address: string } }
) {
  try { 
    await adminMiddleware(request)  
    
    const lotteries = await getLotteriesByContract(Number(params.networkId), params.address)
    
    return NextResponse.json(lotteries, { status: 200 })
  } catch (error) {
    console.error('Error fetching lotteries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
