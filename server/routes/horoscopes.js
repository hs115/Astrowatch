import express from 'express'
import { supabase } from '../config/supabase.js'
import { authenticateUser } from '../middleware/auth.js'

const router = express.Router()

// Get horoscope by zodiac sign and type
router.get('/:zodiacSign/:type', authenticateUser, async (req, res) => {
  try {
    const { zodiacSign, type } = req.params
    const { date } = req.query

    if (!['daily', 'weekly', 'monthly'].includes(type)) {
      return res.status(400).json({ error: 'Invalid horoscope type' })
    }

    const queryDate = date || new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('horoscopes')
      .select('*')
      .eq('zodiac_sign', zodiacSign)
      .eq('type', type)
      .eq('date', queryDate)
      .single()

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: error.message })
    }

    res.json({ horoscope: data })
  } catch (error) {
    console.error('Get horoscope error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all horoscopes for a zodiac sign
router.get('/:zodiacSign', authenticateUser, async (req, res) => {
  try {
    const { zodiacSign } = req.params
    const { type, limit = 10 } = req.query

    let query = supabase
      .from('horoscopes')
      .select('*')
      .eq('zodiac_sign', zodiacSign)
      .order('date', { ascending: false })
      .limit(parseInt(limit))

    if (type && ['daily', 'weekly', 'monthly'].includes(type)) {
      query = query.eq('type', type)
    }

    const { data, error } = await query

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ horoscopes: data })
  } catch (error) {
    console.error('Get horoscopes error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new horoscope (admin only - could add admin middleware later)
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { zodiac_sign, type, content, date } = req.body

    if (!zodiac_sign || !type || !content || !date) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (!['daily', 'weekly', 'monthly'].includes(type)) {
      return res.status(400).json({ error: 'Invalid horoscope type' })
    }

    const { data, error } = await supabase
      .from('horoscopes')
      .insert({
        zodiac_sign,
        type,
        content,
        date
      })
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(201).json({ horoscope: data })
  } catch (error) {
    console.error('Create horoscope error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router 