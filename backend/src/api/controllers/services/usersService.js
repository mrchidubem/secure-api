import User from '../../../models/Users.js'
import { log } from '../../../utils/logger.js'

/**
 * Fields that should NEVER be exposed outside the service layer
 * Password is always excluded
 */
const SAFE_USER_FIELDS = '-password -__v'

/**
 * Create a new user
 * Used by ADMIN to manually add users
 *
 * @param {Object} payload - user data from request body
 * @returns {Object} created user document
 */
export const addUser = async (payload) => {
  log({
    event: 'USER_CREATE_SERVICE',
    message: 'Service: creating user'
  })

  const user = await User.create(payload)

  return user
}

/**
 * Get all users
 * Admin-only operation
 *
 * @returns {Array} list of users without sensitive fields
 */
export const getUsers = async (query) => {
  const mongoQuery = {}
  const { role, active } = query

  if (role) {
    mongoQuery.role = role
  }

  if (active !== undefined) {
    mongoQuery.active = active === 'true'
  }

  log({
    event: 'USERS_FETCH_SERVICE',
    message: 'Service: fetching all users',
    data: mongoQuery
  })

  return await User.find(mongoQuery).select(SAFE_USER_FIELDS)
}

/**
 * Get a single user by ID
 * Admin-only operation
 *
 * @param {String} id - user ID
 * @returns {Object|null} user document or null if not found
 */
export const getUserByIdService = async (id) => {
  log({
    event: 'USER_FETCH_BY_ID_SERVICE',
    message: 'Service: fetching user by id',
    data: { userId: id }
  })

  return await User.findById(id).select(SAFE_USER_FIELDS)
}

/**
 * Delete a user by ID
 * Admin-only operation
 *
 * @param {String} id - user ID
 * @returns {Object|null} deleted user or null if not found
 */
export const deleteUserById = async (id) => {
  log({
    event: 'USER_DELETE_SERVICE',
    message: 'Service: deleting user',
    data: { userId: id }
  })

  return await User.findByIdAndDelete(id)
}

// additional queries
