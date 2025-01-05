import { NextRequest, NextResponse } from 'next/server'

import { PurchaseLotteryTicketsDTO } from '@/lib/types/lottery'


// need to verify csrf token middle ware is firing here
export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    try {

        const body: PurchaseLotteryTicketsDTO = await request.json()
        // validate body

        


    } catch (error) {
        console.error('Error fetching lottery:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}