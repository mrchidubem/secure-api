import { catchAsync } from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'
import {
  addNote,
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById
} from './services/notesServices.js'
import { log } from '../../utils/logger.js'

/**
 * 🧠 CORE BACKEND RULE
 * URL  → identifies the RESOURCE      (req.params / req.query)
 * Auth → identifies the USER          (req.user)
 */
const canAccessNote = (note, user) => {
  return note.user.toString() === user.id || user.role === 'admin'
}

// ===================== CREATE =====================
export const createNote = catchAsync(async (req, res) => {
  /**
   * URL does NOT identify resource yet (creating one)
   * Auth identifies the USER → ownership is enforced here
   */
  delete req.body.user
  req.body.user = req.user.id

  const note = await addNote(req.body)

  res.status(201).json({
    status: 'success',
    data: note
  })
})

// ===================== GET ALL =====================
export const getAllNotes = catchAsync(async (req, res) => {
  /**
   * URL identifies COLLECTION
   * Auth identifies USER → scope the collection
   */
  const filter = {}

  if (req.user.role !== 'admin') {
    filter.user = req.user.id
  }

  const notes = await getNotes(filter)

  res.status(200).json({
    status: 'success',
    results: notes.length,
    data: notes
  })
})

// ===================== GET ONE =====================
export const getNote = catchAsync(async (req, res) => {
  /**
   * URL identifies RESOURCE → req.params.id
   * Auth identifies USER     → req.user
   */
  const note = await getNoteById(req.params.id)

  if (!note) {
    throw new AppError('Note not found', 404)
  }

  if (!canAccessNote(note, req.user)) {
    throw new AppError('You are not allowed to access this note', 403)
  }

  res.status(200).json({
    status: 'success',
    data: note
  })
})

// ===================== UPDATE =====================
export const updateNote = catchAsync(async (req, res) => {
  /**
   * URL identifies RESOURCE → req.params.id
   * Auth identifies USER     → ownership / role check
   */
  const note = await getNoteById(req.params.id)

  if (!note) {
    throw new AppError('Note not found', 404)
  }

  if (!canAccessNote(note, req.user)) {
    throw new AppError('You are not allowed to update this note', 403)
  }

  const updatedNote = await updateNoteById(req.params.id, req.body)

  res.status(200).json({
    status: 'success',
    data: updatedNote
  })
})

// ===================== DELETE =====================
export const deleteNote = catchAsync(async (req, res) => {
  /**
   * URL identifies RESOURCE → req.params.id
   * Auth identifies USER     → owner OR admin
   */
  const note = await getNoteById(req.params.id)

  if (!note) {
    throw new AppError('Note not found', 404)
  }

  if (!canAccessNote(note, req.user)) {
    throw new AppError('You are not allowed to delete this note', 403)
  }

  await deleteNoteById(req.params.id)

  res.status(204).json({
    status: 'success',
    data: null
  })
})
