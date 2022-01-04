const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
	title: {
		type: String,
		required: true
	}, 
	description: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// timestamps: add the time when data is updated or created

module.exports = model('Note', NoteSchema);
