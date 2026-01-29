import jwt from 'jsonwebtoken'
import User from '../../models/Users.js'
import { catchAsync } from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'
import config from '../../config/index.js'

/**
 * Authentication middleware
 * Verifies JWT and attaches user to request
 */
export const protect = catchAsync(async (req, res, next) => {
  let token

  // 1️⃣ Get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  // 2️⃣ No token → unauthorized
  if (!token) {
    return next(new AppError('Not authenticated. Please log in.', 401))
  }

  // 3️⃣ Verify token
  const decoded = jwt.verify(token, config.jwtSecret)

  // 4️⃣ Fetch user & attach to request
  const user = await User.findById(decoded.id).select('-password')

  if (!user) {
    return next(new AppError('User no longer exists', 401))
  }

  req.user = user

  // 5️⃣ Continue
  next()
})

/**
 * Authorization middleware
 * Restricts access to specific roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Forbidden: insufficient permissions', 403)
      )
    }

    next()
  }
}
