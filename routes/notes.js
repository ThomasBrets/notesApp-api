const express = require('express')
const router = express.Router()
const NotesController = require("../controllers/notes")
const { validateUser } = require('../middlewares/auth')

//?Search
router.get("/search-notes", validateUser, NotesController.SearchNote)

//!GET
router.get("/all-notes", NotesController.getAllNotes)
router.get("/:noteId", NotesController.getNote)

//! POST
router.post("/add-note", NotesController.addNote)

//! PUT
router.put("/edit-note/:noteId", NotesController.editNote)
router.put("/edit-note-pinned/:noteId", NotesController.editNotePinned)

//!DELETE
router.delete("/delete-note/:noteId", NotesController.deleteNote)



module.exports = router