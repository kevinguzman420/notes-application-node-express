const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");
const { 
	renderNoteForm, 
	createNewNote, 
	renderNotes,
	renderEditForm,
	updateNote,
	deleteNote
} = require("../controllers/notes.controller");

// New note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

// Get all note
router.get("/notes", isAuthenticated, renderNotes);

// Render edit form
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

// Update note
router.put("/notes/edit/:id", isAuthenticated, updateNote);

// Delete note
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
