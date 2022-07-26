const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");

const ExpressError = require("./middleware/error-handling/ExpressError");

const app = express();

require("./config/passport")(passport);

app.use(passport.initialize());

const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");

app.use(express.json());
app.use(methodOverride("_method"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});

app.use(authRoutes);
app.use(contentRoutes);

app.all("*", (req, res, next) => {
	console.log(req.url);
	next(new ExpressError("Page not found", 404));
});

/**
 * MutlaqAlsadeed@gmail.com
 * Mutlaq_12345
 */
mongoose
	.connect(
		"mongodb+srv://Mutlaq:mutlaq12345@cluster0.quhpg.mongodb.net/server1?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then((result) => {
		console.log("HI");
		app.listen(3000);
	})
	.catch((err) => console.log(err));
