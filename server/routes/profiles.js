import express from 'express'
import { supabase } from '../config/supabase.js'
import { authenticateUser } from '../middleware/auth.js'

const router = express.Router()

// Get user profile
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: error.message })
    }

    res.json({ profile: data })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user profile
router.put('/', authenticateUser, async (req, res) => {
  try {
    const { full_name, birth_date, birth_time, birth_place, zodiac_sign } = req.body

    const updateData = {
      id: req.user.id,
      email: req.user.email,
      updated_at: new Date().toISOString()
    }

    if (full_name !== undefined) updateData.full_name = full_name
    if (birth_date !== undefined) updateData.birth_date = birth_date
    if (birth_time !== undefined) updateData.birth_time = birth_time
    if (birth_place !== undefined) updateData.birth_place = birth_place
    if (zodiac_sign !== undefined) updateData.zodiac_sign = zodiac_sign

    const { data, error } = await supabase
      .from('profiles')
      .upsert(updateData)
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ profile: data })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router 