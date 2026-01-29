import Note from '../../../models/Notes.js'
import { log } from '../../../utils/logger.js'

// ===================== CREATE =====================
export const addNote = async (payload) => {
  log({
    event: 'NOTE_CREATE_SERVICE',
    message: 'Service: creating note'
  })

  return await Note.create(payload)
}

// ===================== GET ALL =====================
export const getNotes = async (filter = {}) => {
  log({
    event: 'NOTES_FETCH_SERVICE',
    message: 'Service: fetching notes',
    data: filter
  })

  return await Note.find(filter).sort({ createdAt: -1 })
}

// ===================== GET ONE =====================
export const getNoteById = async (id) => {
  log({
    event: 'NOTE_FETCH_BY_ID_SERVICE',
    message: 'Service: fetching note by id',
    data: { noteId: id }
  })

  return await Note.findById(id)
}

// ===================== UPDATE =====================
export const updateNoteById = async (id, payload) => {
  log({
    event: 'NOTE_UPDATE_SERVICE',
    message: 'Service: updating note',
    data: { noteId: id }
  })

  return await Note.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  })
}

// ===================== DELETE =====================
export const deleteNoteById = async (id) => {
  log({
    event: 'NOTE_DELETE_SERVICE',
    message: 'Service: deleting note',
    data: { noteId: id }
  })

  return await Note.findByIdAndDelete(id)
}
