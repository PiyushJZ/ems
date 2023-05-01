import express from 'express'
const router = express.Router()
import {deleteNote, getNotes,postNotes,updateNote} from "../controllers/notes.js"

router.get('/', getNotes)
router.post("/",postNotes)
router.put("/:noteId", updateNote)
router.delete("/:noteId", deleteNote)

export default router;