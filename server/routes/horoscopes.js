import express from 'express'
import { getDb } from '../config/supabase.js'
import { authenticateUser } from '../middleware/auth.js'

const router = express.Router()

// Get horoscope by zodiac sign and type
router.get('/:zodiacSign/:type', authenticateUser, async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [GET] /api/horoscopes/:zodiacSign/:type - start`)
  try {
    const { zodiacSign, type } = req.params
    const { date } = req.query
    if (!['daily', 'weekly', 'monthly'].includes(type)) {
      return res.status(400).json({ error: 'Invalid horoscope type' })
    }
    const queryDate = date || new Date().toISOString().split('T')[0]
    const db = await getDb()
    const horoscopes = db.collection('horoscopes')
    const horoscope = await horoscopes.findOne({
      zodiac_sign: zodiacSign,
      type,
      date: queryDate
    })
    console.log(`[${timestamp}] [GET] /api/horoscopes/:zodiacSign/:type - end`)
    res.json({ horoscope })
  } catch (error) {
    console.error('Get horoscope error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all horoscopes for a zodiac sign
router.get('/:zodiacSign', authenticateUser, async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [GET] /api/horoscopes/:zodiacSign - start`)
  try {
    const { zodiacSign } = req.params
    const { type, limit = 10 } = req.query
    const db = await getDb()
    const horoscopes = db.collection('horoscopes')
    const query = { zodiac_sign: zodiacSign }
    if (type && ['daily', 'weekly', 'monthly'].includes(type)) {
      query.type = type
    }
    const results = await horoscopes.find(query).sort({ date: -1 }).limit(parseInt(limit)).toArray()
    console.log(`[${timestamp}] [GET] /api/horoscopes/:zodiacSign - end`)
    res.json({ horoscopes: results })
  } catch (error) {
    console.error('Get horoscopes error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new horoscope (admin only - could add admin middleware later)
router.post('/', authenticateUser, async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [POST] /api/horoscopes - start - Body:`, JSON.stringify(req.body))
  try {
    const { zodiac_sign, type, content, date } = req.body
    if (!zodiac_sign || !type || !content || !date) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    if (!['daily', 'weekly', 'monthly'].includes(type)) {
      return res.status(400).json({ error: 'Invalid horoscope type' })
    }
    const db = await getDb()
    const horoscopes = db.collection('horoscopes')
    const doc = { zodiac_sign, type, content, date }
    const result = await horoscopes.insertOne(doc)
    console.log(`[${timestamp}] [POST] /api/horoscopes - end`)
    res.status(201).json({ horoscope: { ...doc, _id: result.insertedId } })
  } catch (error) {
    console.error('Create horoscope error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router 