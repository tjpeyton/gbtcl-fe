import { MongoClient } from 'mongodb'


if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
}

let clientPromise: Promise<MongoClient>
if (process.env.NODE_ENV === 'development') {
  // Cache client promise in development, preserve connection across HMR
  const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client
      .connect()
      .then(client => {
        console.log('Connected to MongoDB')
        return client
      })
      .catch(error => {
        console.error('MongoDB connection error:', error)
        throw error
      })
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  const client = new MongoClient(uri, options)
  clientPromise = client
    .connect()
    .then(client => {
      console.log('Connected to MongoDB')
      return client
    })
    .catch(error => {
      console.error('MongoDB connection error:', error)
      throw error
    })
}

const getDb = async (dbName: string) => {
  const client = await clientPromise
  return client.db(dbName)
}

export default clientPromise
export {
  getDb
} 
