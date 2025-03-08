import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'
import { getLottery } from '@/lib/mongodb/models/lottery'
import { deleteLottery } from '@/app/services/lotteryService'


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
  { searchParams }: { searchParams: URLSearchParams } 
) {
  try { 
    await adminMiddleware(request)  

    // Create filter type
    const contract = searchParams.get('contract')

    if(!contract) {
      return NextResponse.json({ error: 'Contract address is required' }, { status: 400 })
    } 
    
    const lottery = await getLottery(Number(params.id))
    return NextResponse.json({ lottery }, { status: 200 })
  } catch (error) {
    console.error('Error fetching lotteries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
  { searchParams }: { searchParams: URLSearchParams }   
) {
  try {
    await adminMiddleware(request)

    if(!params.id) {
      return NextResponse.json({ error: 'Lottery ID is required' }, { status: 400 })
    }

    const contractAddress = searchParams.get('contract')

    if(!contractAddress) {
      return NextResponse.json({ error: 'Contract address is required' }, { status: 400 })
    }

    await deleteLottery(contractAddress, params.id)

    return NextResponse.json({ message: 'Lottery deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting lottery:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
