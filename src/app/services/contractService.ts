import { ContractDocument, GetAllContractsResponse } from "@/lib/types/contract"

import { ConnectContractFormData } from "@/components/forms/ConnectContractForm/types"


const API_URL = '/api/contract/'

export const fetchContract = async (address: string) : Promise<ContractDocument> => {
    try {   
        const res = await fetch(`${API_URL}${address}`)
        if (!res.ok) throw new Error('Failed to fetch contract')

        const data = await res.json()
        if (!data.contract) throw new Error('Contract not found')

        return data.contract
    } catch (error: any) {
        throw error
    }
}

export const fetchAllContracts = async () : Promise<GetAllContractsResponse> => {
    try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Failed to fetch contracts')

        return await res.json()
    } catch (error: any) {
        throw error
    }
}   

export const saveContract = async (contract: ConnectContractFormData, csrfToken: string) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(contract),
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        if (!res.ok) throw new Error('Failed to save contract')

        return await res.json()
    } catch (error: any) {
        throw error
    }
}  
