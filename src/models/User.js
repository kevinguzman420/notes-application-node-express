const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
}, {
	timestamps: true
});

// (down): Encripta la contraseña con la que el usuario se registra:
// ".methods (from mongoose)": permite crear un metodo para la propia clase
UserSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

// Comparar las contraseñas, la que ingresa el usuario, y la encriptada
// almacenada en la bd.
UserSchema.methods.matchPassword = async function(password) {
	// (down): return "true" or "false":
	return await bcrypt.compare(password, this.password); // "this.password": hace referencia al password de la clase UserSchema, mediante la funcion tradicional.
}

module.exports = model("User", UserSchema);

