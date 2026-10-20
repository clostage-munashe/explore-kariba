import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
const port = Number(process.env.PORT || 5000)

if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
  throw new Error('Add MONGODB_URI and DB_NAME to server/.env')
}

app.use(cors({ origin: process.env.FRONTEND_ORIGIN }))
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Kariba Explorer API is connected' })
})

app.get('/api/listings', async (req, res) => {
  try {
    const filter = { published: true }
    const { category } = req.query

    if (typeof category === 'string' && category !== 'All places') {
      filter.category = category
    }

    const listings = await client
      .db(process.env.DB_NAME)
      .collection('listings')
      .find(filter, { projection: { _id: 0 } })
      .sort({ name: 1 })
      .limit(50)
      .toArray()

    res.json(listings)
  } catch (error) {
    console.error('Could not load listings:', error.message)
    res.status(500).json({ error: 'Could not load listings' })
  }
})

async function startServer() {
  await client.connect()
  console.log('Connected to MongoDB')

  app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Could not start the API:', error.message)
  process.exit(1)
})
