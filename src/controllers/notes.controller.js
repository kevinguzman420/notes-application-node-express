const Note = require("../models/Note");
const notesCtrl = {};

// New notes
// Render note form 
notesCtrl.renderNoteForm = (req, res) => {
	res.render("notes/new-notes");
}
// Save note
notesCtrl.createNewNote = async (req, res) => {
	const { title, description } = req.body;
	const newNote = new Note({title: title, description: description});
	newNote.user = req.user.id;
	newNote.save();
	req.flash("success_msg", "Note Added Successfully");
	res.redirect("/notes");

}

// Get all note
notesCtrl.renderNotes = async (req, res) => {
	const notes = await Note.find({user: req.user.id})
		.sort({createdAt: 'desc'})
		.lean();
	res.render("notes/all-notes", { notes });
}

// Edit Note
// Render edit note form
notesCtrl.renderEditForm = async (req, res) => {
	const note = await Note.findById(req.params.id).lean();
	if (note.user != req.user.id) {
		req.flash("error_msg", "Not Authorized.");
		res.redirect("/notes");
	}
	res.render("notes/edit-notes", { note });
}
// Update note
notesCtrl.updateNote = async (req, res) => {
	const id = req.params;
	const { title, description } = req.body;
	await Note.findOneAndUpdate({id}, {title, description});
	req.flash("success_msg", "Note Updated Successfully");
	res.redirect("/notes");
}

// Delete note
notesCtrl.deleteNote = async (req, res) => {
	await Note.findByIdAndDelete(req.params.id);
	req.flash("success_msg", "Note Deleted Successfully");
	res.redirect("/notes");
}

module.exports = notesCtrl;
