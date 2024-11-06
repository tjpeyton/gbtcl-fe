import { NextRequest, NextResponse } from "next/server"

import { getDb } from "@/lib/mongodb"
import { verifyCsrfToken } from "@/lib/csrf"
import { CHAIN_ID_TO_ETHERSCAN_API_URL } from "@/lib/utils"

import { contractSchema } from "@/components/forms/ConnectContractForm/schema"


interface Lottery {
    id: number,
    ticketPrice: number,
    maxTickets: number,
    expiration: number,
    operatorTicketPercentage: number
}

interface Contract {
    address: string,
    abi: string,
    chainId: string,
    lottery?: Lottery[]
}

interface EtherscanResponse {
    status: string
    message: string
    result: string
}

export async function POST(request: NextRequest) {
    try {
        // Validate CSRF token
        const csrfToken = request.headers.get('X-CSRF-Token')
        if (!csrfToken) {
            return NextResponse.json(
                { error: 'Missing CSRF token' },
                { status: 403 }
            )
        }
        await verifyCsrfToken(csrfToken)

        // Validate form data
        const body = await request.json()
        const result = contractSchema.safeParse(body)
        
        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 })
        } 

        const chainId = result.data.chain
        const address = result.data.contractAddress.toLowerCase()

        const ETHERSCAN_API_URL = CHAIN_ID_TO_ETHERSCAN_API_URL[chainId]

        // Validate contract and retrieve abi
        const response = await fetch(
            ETHERSCAN_API_URL + 
            `?module=contract&action=getabi&` +         
            `address=${address}&` +
            `apikey=${process.env.ETHERSCAN_API_KEY}`
        )

        const data: EtherscanResponse = await response.json()
        if (data.status === '0') {
            return NextResponse.json(
                { error: data.result },
                { status: 400 }
            )
        }

        const abi = JSON.parse(data.result)

        const contract: Contract = {
            address,
            chainId,
            abi,
            lottery: []
        }

        const db = await getDb('gbtcl')
        const collection = db.collection<Contract>('contract')

        // Check if contract exists first
        const existingContract = await collection.findOne({
            address: result.data.contractAddress.toLowerCase()
        })

        if (existingContract) {
            return NextResponse.json({ 
                message: 'Contract already exists for this network' 
            }, { status: 409 })
        }

        await collection.insertOne((contract))

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
