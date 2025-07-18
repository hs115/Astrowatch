import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

if (!uri || !dbName) {
  throw new Error('Missing MongoDB environment variables')
}

let client
let db

export async function getDb() {
  if (!client || !db) {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db(dbName)
  }
  return db
} 