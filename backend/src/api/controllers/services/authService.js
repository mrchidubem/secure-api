import User from '../../../models/Users.js'
import bcrypt from 'bcryptjs'
import { log } from '../../../utils/logger.js'
import { AppError } from '../../../utils/AppError.js'

// login user
const loginUser = async (email, password) => {
  // find user
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new AppError('invalid credentials', 401)
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new AppError('invalid credentials', 401)
  }

  // remove password
  user.password = undefined

  // log login
  log({
    level: 'info',
    event: 'user_login',
    data: {
      id: user._id,
      role: user.role
    }
  })

  return user
}

// register user
const registerUser = async (data) => {
  const user = await User.create(data)

  log({
    level: 'info',
    event: 'user_registered',
    data: {
      id: user._id,
      email: user.email
    }
  })

  return user
}

export { registerUser, loginUser }
