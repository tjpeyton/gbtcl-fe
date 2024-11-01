export interface ContractDocument {
    address: string
    abi: any
    lottery?: any[]
    createdAt: Date
}

export interface AdminDocument {
    address: string,
    name?: string
}
  