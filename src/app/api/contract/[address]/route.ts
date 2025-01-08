import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'

import { getContract } from '@/lib/mongodb/models'


export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try { 
    await adminMiddleware(request) 

    const contract = await getContract(params.address)

    return NextResponse.json({ contract }, { status: 200 })
  } catch (error) {
    console.error('Error fetching contract:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
 