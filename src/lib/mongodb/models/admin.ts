import { AdminDocument } from "@/lib/types/admin"

import { getDb } from "../client"

export const isAdmin = async (address: string) : Promise<boolean> => {
    const db = await getDb('gbtcl')
    const collection = db.collection<AdminDocument>('admin')

    const admin = await collection.findOne({ address: address.toLowerCase() })

    return admin !== null
}
