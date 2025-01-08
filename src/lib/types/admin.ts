import { ObjectId } from 'mongodb'

type AdminDocument = {
    _id: ObjectId,
    address: string,
    name?: string
}

type Admin = Omit<AdminDocument, '_id'>  

export {
  type AdminDocument,
  type Admin
} 
