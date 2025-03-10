import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'
import { getContract } from '@/lib/mongodb/models'


export async function GET(
  request: NextRequest,
  { params }: { params: { networkId: string, address: string } }
) {
  try { 
    await adminMiddleware(request) 
 
    const contract = await getContract(params.networkId, params.address)
    
    return NextResponse.json(contract, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json({ error: error.message }, { status: error.cause })
  }
}
