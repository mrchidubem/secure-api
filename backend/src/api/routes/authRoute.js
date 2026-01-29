import express from 'express'
import { authLimiter } from "../middlewares/rateLimiter.js"
import { login, register } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/login', authLimiter, login)
//authRouter.post('/refresh', refresh)
authRouter.post('/register', register)
//authRouter.post('/logout', logout)

export default authRouter
