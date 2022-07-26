const jwt = require("jsonwebtoken");
const ExpressError = require("../error-handling/ExpressError");
module.exports = (req, res, next) => {
	const token = req.get("Authorization")?.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(
			token,
			"RESTAPIauthenticationusingpassportjs"
		);
	} catch (error) {
		throw new ExpressError(error.toString().substring(0, 50), 500);
	}
	if (!decodedToken) {
		throw new ExpressError("Not Authenticated", 401);
	}
	req.userId = decodedToken.userId;
	next();
};
