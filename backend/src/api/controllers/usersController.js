import { catchAsync } from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'
import {
  addUser,
  getUsers,
  getUserByIdService,
  deleteUserById
} from './services/usersService.js'
import { log } from '../../utils/logger.js'

// create new user (ADMIN)
export const createUser = catchAsync(async (req, res) => {
  log({
    event: 'USER_CREATE',
    message: 'Admin creating user',
    data: { email: req.body.email }
  })

  const user = await addUser(req.body)

  res.status(201).json({
    status: 'success',
    data: user
  })
})

// get all users (ADMIN)
export const getAllUsers = catchAsync(async (req, res) => {
  log({
    event: 'USERS_FETCH',
    message: 'Admin fetching all users'
  })

  const users =  await getUsers(req.query)

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users
  })
})

// get current logged-in user profile
export const getMyProfile = (req, res) => {
  log({
    event: 'USER_ME',
    message: 'User fetching own profile',
    data: { userId: req.user.id }
  })

  res.status(200).json({
    status: 'success',
    data: req.user
  })
}

// get user by id (ADMIN)
export const getUserById = catchAsync(async (req, res) => {
  log({
    event: 'USER_FETCH_BY_ID',
    message: 'Admin fetching user by id',
    data: { userId: req.params.id }
  })

  const user =  await getUserByIdService(req.params.id)

  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.status(200).json({
    status: 'success',
    data: user
  })
})

// delete user (ADMIN)
export const deleteUser = catchAsync(async (req, res) => {
  log({
    event: 'USER_DELETE',
    message: 'Admin deleting user',
    data: { userId: req.params.id }
  })

  const user = await deleteUserById(req.params.id)

  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})

// additional Handlers
