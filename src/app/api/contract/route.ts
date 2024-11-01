import { NextResponse } from "next/server"

import { getDb } from "@/lib/mongodb"

type Lottery = {
    id: number,
    ticketPrice: number,
    maxTickets: number,
    expiration: number,
    operatorTicketPercentage: number
}

type Contract = {
    address: string,
    abi: string,
    lottery?: Lottery[]
}

export async function POST(request: Request) {
    try {
        const db = await getDb('gbtcl')
        const collection = db.collection<Contract>('contract')

        const body = await request.json()

        const contract: Contract = {
            address: body.address ?? '',
            abi: body.abi ?? '',
            lottery: []
        }

        await collection.insertOne(contract)

        return NextResponse.json(
            { message: 'ok' },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error inserting contract:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
