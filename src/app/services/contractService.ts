import { ContractDocument, GetAllContractsResponse } from '@/lib/types/contract'

import { ConnectContractFormData } from '@/components/forms/ConnectContractForm/types'


const API_URL = '/api/contract/'

export const fetchContract = async (address: string) : Promise<ContractDocument> => {
  try {   
    const res = await fetch(`${API_URL}${address}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch contract: ${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error: any) {
    throw new Error(`Network Error: Failed to fetch contract: ${error.message}`)  
  }
}

export const fetchAllContracts = async () : Promise<GetAllContractsResponse> => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) {
      throw new Error(`Failed to fetch contracts: ${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error: any) {
    throw new Error(`Network Error: Failed to fetch contracts: ${error.message}`)
  }
}   

export const saveContract = async (contract: ConnectContractFormData, csrfToken: string) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(contract),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    }
  })
    
  if (!res.ok) {
    if(res.status === 409 ) {
      throw new Error('Contract already exists for this network')
    }
    throw new Error(`Failed to save contract: ${res.status} ${res.statusText}`)
  }

  return res.json()
}  
