import jwt from 'jsonwebtoken'
import { loginUser, registerUser } from './services/authService.js' 
import config from '../../config/index.js'
import { catchAsync } from '../../utils/catchAsync.js'

// Sign JWT
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: '1h' }
  )
}

// Login controller
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body

  // Call service to validate user
  const user = await loginUser(email, password)

  // Generate token
  const token = signToken(user)

  res.status(200).json({
    status: 'success',
    token,
    email: user.email,
    role: user.role
  })
})



export const register = catchAsync(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 'success',
    data: user
  })
})