import { ObjectId } from "mongodb";

export type AdminDocument = {
    _id: ObjectId,
    address: string,
    name?: string
}

export type Admin = Omit<AdminDocument, '_id'>  
