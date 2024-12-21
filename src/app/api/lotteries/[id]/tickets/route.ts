
import { NextRequest, NextResponse } from 'next/server'

// need to verify csrf token middle ware is firing here
export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    try {

        const body = await request.json()
        
    } catch (error) {
        console.error('Error fetching lottery:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}