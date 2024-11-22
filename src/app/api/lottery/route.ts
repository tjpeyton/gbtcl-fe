import { NextRequest, NextResponse } from 'next/server'

import { adminMiddleware } from '@/lib/middleware/admin'

import { getDb } from '@/lib/mongodb'

import { z } from 'zod'


export interface Lottery {
    contract: {
        address: string,
        chainId: number
    },
    lotteryId: number, 
    ticketPrice: number,
    maxTickets: number,
    expiration: number,
    operatorCommissionPercentage: number,
    createdAt: string
    winnerSelectedAt?: string,
    winnerAddress?: string,
}

const createLotterySchema = z.object({
    contract: z.object({
        address: z.string().min(1),
        chainId: z.number().min(1)
    }),
    lotteryId: z.number().min(1),   
    ticketPrice: z.number().min(100),
    maxTickets: z.number().min(1),
    expiration: z.number().min(1000),
    operatorCommissionPercentage: z.number().min(1).max(50),
    createdAt: z.string().datetime(),
})


export async function GET(request: NextRequest) {
    try { 
        await adminMiddleware(request)  

        const db = await getDb('gbtcl')
        const collection = db.collection<Lottery>('lottery')

        const lotteries = await collection.find().toArray()

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
            console.log('result', result.error.issues)  
            return NextResponse.json({ error: result.error.issues }, { status: 400 })
        }

        const lotteryDocument: Lottery = {
            ...result.data,
        }   

        const db = await getDb('gbtcl')
        const collection = db.collection<Lottery>('lottery')

        await collection.insertOne(lotteryDocument)

        return NextResponse.json({ message: 'Lottery created successfully' }, { status: 201 })
    } catch (error) {
        console.error('Error creating lottery:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}