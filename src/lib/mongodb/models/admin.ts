import { getDb } from "../client"
import { AdminDocument } from "./types"


export const isAdmin = async (address: string) : Promise<boolean> => {
    const db = await getDb('gbtcl')
    const collection = db.collection<AdminDocument>('admin')

    const admin = await collection.findOne({ address: address.toLowerCase() })

    return admin !== null
}
