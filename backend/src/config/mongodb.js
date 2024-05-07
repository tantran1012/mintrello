import { MongoClient, ServerApiVersion } from 'mongodb'
import getEnv from './environment'

const mongoURI = getEnv('MONGODB_URI')
const DB_Name = getEnv('DATABASE_NAME')

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(DB_Name)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
