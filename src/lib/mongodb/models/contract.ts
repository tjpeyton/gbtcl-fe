import { ContractDocument, getDb } from ".."


export const insertContract = async (contract: Omit<ContractDocument, 'createdAt'>) => {
    const db = await getDb('gbtcl')
    const collection = db.collection<ContractDocument>('contracts')
    
    return collection.insertOne({
      ...contract,
      createdAt: new Date()
    })
}
