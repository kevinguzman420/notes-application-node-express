const mongoose = require("mongoose");

const { MONGODB_HOST, MONGODB_USER, MONGODB_PASSWORD, MONGODB_DBNAME } = process.env;


const MONGODB_URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:27017/${MONGODB_DBNAME}?authSource=admin`;
console.log("MONGODB_HOST");

mongoose.connect(MONGODB_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	//useFindAndModify: false,
	//useCreateIndex: true
})
	.then(db => console.log("Database is connected"))
	.catch(err => console.log(err));
