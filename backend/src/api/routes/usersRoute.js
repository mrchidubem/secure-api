import express from 'express'
import { protect, restrictTo } from '../middlewares/authMiddleware.js'
import {
  getAllUsers,
  createUser,
  getMyProfile,
  getUserById,
  deleteUser
} from '../controllers/usersController.js'

const usersRouter = express.Router()

// current logged in user
usersRouter
  .route('/me')
  .get(protect, getMyProfile)

// users collection
usersRouter
  .route('/')
  .get(protect, restrictTo('admin'), getAllUsers)
  .post(protect, restrictTo('admin'), createUser)

// single user
usersRouter
  .route('/:id')
  .get(protect, restrictTo('admin'), getUserById)
  .delete(protect, restrictTo('admin'), deleteUser)

// 



export default usersRouter;
