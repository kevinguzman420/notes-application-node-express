const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		}, 
		async (email, password, done) => {

			// Match Email's User
			const user = await User.findOne({email});

			if (!user) {
				return done(null, false, { message: "Not User Found" });
			} else {
				// Match Password's User
				const match = await user.matchPassword(password);
				if (match) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Incorrect Password" });
				}
			}
		}
	)
);

// Para guardar el "id" del usuario en la sesión del servidor
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Revisa en la bd si el usuario es válido mediante el "id" en la sesón
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	})
})
