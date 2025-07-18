import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDb } from '../config/supabase.js'

const router = express.Router()

// Sign up
router.post('/signup', async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [POST] /api/auth/signup - start - Body:`, JSON.stringify(req.body))
  try {
    const { email, password, full_name } = req.body
    if (!email || !password) {
      console.log(`[${timestamp}] [POST] /api/auth/signup - missing email or password`)
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const db = await getDb()
    const users = db.collection('users')
    const existing = await users.findOne({ email })
    if (existing) {
      console.log(`[${timestamp}] [POST] /api/auth/signup - email already exists`)
      return res.status(400).json({ error: 'Email already exists' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = {
      email,
      password: hashed,
      full_name: full_name || '',
      created_at: new Date(),
      updated_at: new Date(),
    }
    const result = await users.insertOne(user)
    // Generate JWT for the new user
    const token = jwt.sign({ id: result.insertedId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    console.log(`[${timestamp}] [POST] /api/auth/signup - end`)
    res.status(201).json({ 
      message: 'User created successfully',
      user: { email: user.email, full_name: user.full_name },
      session: { token }
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Sign in
router.post('/signin', async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [POST] /api/auth/signin - start - Body:`, JSON.stringify(req.body))
  try {
    const { email, password } = req.body
    if (!email || !password) {
      console.log(`[${timestamp}] [POST] /api/auth/signin - missing email or password`)
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const db = await getDb()
    const users = db.collection('users')
    const user = await users.findOne({ email })
    if (!user || !user.password) {
      console.log(`[${timestamp}] [POST] /api/auth/signin - invalid credentials`)
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      console.log(`[${timestamp}] [POST] /api/auth/signin - invalid credentials`)
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    // Issue JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    console.log(`[${timestamp}] [POST] /api/auth/signin - end`)
    res.json({ 
      message: 'Signed in successfully',
      user: { email: user.email, full_name: user.full_name },
      session: { token }
    })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get session
router.get('/session', async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [GET] /api/auth/session - start`)
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log(`[${timestamp}] [GET] /api/auth/session - no token provided`)
      return res.status(401).json({ error: 'No token provided' })
    }
    const token = authHeader.substring(7)
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(`[${timestamp}] [GET] /api/auth/session - end`)
      res.json({ session: { user: { id: decoded.id, email: decoded.email } } })
    } catch (err) {
      console.log(`[${timestamp}] [GET] /api/auth/session - invalid session`)
      return res.status(401).json({ error: 'Invalid session' })
    }
  } catch (error) {
    console.error('Get session error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Sign out (client should just delete token)
router.post('/signout', async (req, res) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [POST] /api/auth/signout - start`)
  // No server-side action needed for JWT signout
  console.log(`[${timestamp}] [POST] /api/auth/signout - end`)
  res.json({ message: 'Signed out successfully' })
})

export default router 