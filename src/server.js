const express = require('express');
//const exphbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

// Initializations
const app = express();
// Include passport config
require("./config/passport");

//Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "/views"));
// Configurar handlebars para que sepa donde estan los layouts y los
// partials, tambien cual es el layout por defecto y la extension que
// usaremos:
//app.engine('.hbs', exphbs({
	//defaultLayout: 'main',
	//layoutsDir: path.join(app.get("views"), 'layouts'),
	//partialsDir: path.join(app.get("views"), 'partials'),
	//extname: '.hbs'
//}));
app.engine('.hbs', engine({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get("views"), 'layouts'),
	partialsDir: path.join(app.get("views"), 'partials'),
	extname: '.hbs'
}));
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false})); // To get forms data
app.use(methodOverride("_method"));
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));
// Ever after session config
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	res.locals.user = req.user || null; // Got info user
	next();
})

// Routes
app.use(require("./routes/index.routes.js"));
app.use(require("./routes/notes.routes.js"));
app.use(require("./routes/users.routes.js"));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
