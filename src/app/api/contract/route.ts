import { NextRequest, NextResponse } from "next/server"

import { adminMiddleware } from "@/lib/middleware/admin"

import { getAllContracts, getContract, insertContract } from "@/lib/mongodb"
import { connectContractSchema, Contract } from "@/lib/types/contract"

import { EtherscanResponse, validateContract } from "@/lib/etherscan"


export async function GET(request: NextRequest) {
    try { 
        await adminMiddleware(request)  

        const query = request.nextUrl.searchParams  
        const address = query.get('address')
        if(address) {
            const contract = await getContract(address)
            return NextResponse.json({ contract }, { status: 200 })
        } else {
            const contracts = await getAllContracts()
            return NextResponse.json({ contracts }, { status: 200 })
        }
    } catch (error) {
        console.error('Error fetching contracts:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
} 

export async function POST(request: NextRequest) {
    try {
        // Only allow admins to add contracts
        await adminMiddleware(request)

        // Validate form data
        const body = await request.json()
        const result = connectContractSchema.safeParse(body)
        
        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 })
        } 

        const chainId = result.data.chain
        const address = result.data.contractAddress.toLowerCase()

        // Validate contract and retrieve abi   
        const data: EtherscanResponse = await validateContract(chainId, address)
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
            lottery: [],
            createdAt: new Date()
        }

        await insertContract(contract)

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
