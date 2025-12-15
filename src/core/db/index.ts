import db from 'mongoose'

const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1'
const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'test'
const MONGO_USER = process.env.MONGO_USER || ''
const MONGO_PASSWD = process.env.MONGO_PASSWD || ''

let MONGO_URI: string
if (MONGO_USER && MONGO_PASSWD) {
  MONGO_URI =
    process.env.MONGO_URI ||
    `mongodb://${MONGO_USER}:${MONGO_PASSWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
} else {
  MONGO_URI = process.env.MONGO_URI || `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
}

db.set('strictQuery', false)

// Connection state
let isConnected = false

// Connection options for serverless environments
const connectionOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 1,
}

// Connect to MongoDB
async function connectDB() {
  if (isConnected) {
    return db
  }

  if (db.connection.readyState === 1) {
    isConnected = true
    return db
  }

  try {
    await db.connect(MONGO_URI, connectionOptions)
    isConnected = true
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    isConnected = false
    throw error
  }

  // Handle connection events
  db.connection.on('connected', () => {
    isConnected = true
    console.log('MongoDB connected')
  })

  db.connection.on('error', (err) => {
    isConnected = false
    console.error('MongoDB connection error:', err)
  })

  db.connection.on('disconnected', () => {
    isConnected = false
    console.log('MongoDB disconnected')
  })

  return db
}

// Export connection function for use in API routes
export default db
export { connectDB }
