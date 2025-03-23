import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'
import { deleteContract, getContract, deleteLotteriesByContract } from '@/lib/mongodb/models'


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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { networkId: string, address: string } }
) {
  try { 
    await adminMiddleware(request) 

    const contract = {
      chainId: Number(params.networkId), 
      address: params.address
    }

    await deleteContract(contract)
    await deleteLotteriesByContract(contract)

    return NextResponse.json(
      { message: 'Contract deleted successfully' }, 
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error deleting contract:', error)
    return NextResponse.json(
      { error: error.message }, 
      { status: error.cause }
    )
  }
} 
