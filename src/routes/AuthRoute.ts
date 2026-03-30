import express from 'express'
import * as authService from '../services/AuthService'
import * as authMiddleware from '../middleware/AuthMiddleware'
import type { roleModel as role } from '../generated/prisma/models/role'
import type { RegisterRequest } from '../models/RegisterRequest'
import { Prisma } from '../generated/prisma/client'
const router = express.Router()

router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body
  const user = await authService.findByUsername(username)

  if (!user) {
    res.status(401).json({ messege: "User doesn't exist" })
    return
  }

  if (password === undefined || user.password === undefined || user.password === null) {
    res.status(400).json({ messege: 'Password is required' })
    return
  }

  const isPasswordCorrect = await authService.comparePassword(password, user.password)

  if (!isPasswordCorrect) {
    res.status(401).json({ messege: 'Invalid credentials' })
    return
  }

  const token = authService.generatetoken(user.id)

  res.status(200).json({
    status: 'success',
    access_token: token,
    // user: {
    //   id: user.id,
    //   username: user.organizer?.name || 'unknown',
    //   roles: user.roles.map((role: { name: string }) => role.name),
    // },
  })
})

router.get('/me', authMiddleware.protect, async (req, res) => {
  const user = req.body.user

  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      username: user.organizer?.name || 'unknown',
      events: user.organizer?.events || [],
      roles: user.roles.map((role: role) => role.name),
    },
  })
})

router.post('/admin', authMiddleware.protect, authMiddleware.checkAdmin, async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'You are an admin',
  })
})

router.post('/register', async (req, res) => {
  const registerRequest: RegisterRequest = req.body

  if (!registerRequest.organizerName || !registerRequest.username || !registerRequest.password) {
    res.status(400).json({ status: 'error', message: 'organizerName, username and password are required' })
    return
  }

  try {
    await authService.registerUser(registerRequest)
    res.status(201).json({ status: 'success', user: 'User registered successfully' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ status: 'error', message: 'Username already exists' })
      return
    }

    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
})

router.post('/updatePassword', authMiddleware.protect, async (req, res) => {
  const user = req.body.user
  const { password } = req.body

  if (!password) {
    res.status(400).json({ status: 'error', message: 'Password is required' })
    return
  }

  try {
    await authService.updatePassword(user.id, password)
    res.status(200).json({
      status: 'success',
      user: {
        id: user.id,
        organizerName: user.organizer?.name || 'unknown',
        username: user.username,
        roles: user.roles.map((role: role) => role.name),
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
})


export default router
