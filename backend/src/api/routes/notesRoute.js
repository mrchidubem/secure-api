import express from 'express'
import { protect, restrictTo } from '../middlewares/authMiddleware.js'
import {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote
} from '../controllers/notesController.js'

const notesRouter = express.Router()

// current user's notes (if needed, can filter by req.user.id)
notesRouter
  .route('/')
  .get(protect, getAllNotes)
  .post(protect, createNote)

notesRouter
  .route('/:id')
  .get(protect, getNote)
  .put(protect, updateNote)
  .delete(protect, restrictTo('admin'), deleteNote)

export default notesRouter
