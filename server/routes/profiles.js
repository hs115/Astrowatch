import express from 'express'
import { getDb } from '../config/supabase.js'
import { authenticateUser } from '../middleware/auth.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

// Get user profile
router.get('/', authenticateUser, async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [GET] /api/profiles - start`)
  try {
    const db = await getDb()
    const profiles = db.collection('profiles')
    const profile = await profiles.findOne({ id: req.user.id })
    console.log(`[${timestamp}] [GET] /api/profiles - end`)
    res.json({ profile })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user profile
router.put('/', authenticateUser, async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [PUT] /api/profiles - start - Body:`, JSON.stringify(req.body))
  try {
    const { full_name, birth_date, birth_time, birth_place, zodiac_sign } = req.body
    const db = await getDb()
    const profiles = db.collection('profiles')
    const updateData = {
      updated_at: new Date().toISOString()
    }
    if (full_name !== undefined) updateData.full_name = full_name
    if (birth_date !== undefined) updateData.birth_date = birth_date
    if (birth_time !== undefined) updateData.birth_time = birth_time
    if (birth_place !== undefined) updateData.birth_place = birth_place
    if (zodiac_sign !== undefined) updateData.zodiac_sign = zodiac_sign
    // Upsert profile by user id
    const result = await profiles.findOneAndUpdate(
      { id: req.user.id },
      { $set: { ...updateData, id: req.user.id, email: req.user.email } },
      { upsert: true, returnDocument: 'after' }
    )
    console.log(`[${timestamp}] [PUT] /api/profiles - end`)
    res.json({ profile: result.value })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router 