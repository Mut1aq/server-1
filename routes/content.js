const express = require("express");

const router = express.Router();

const contentController = require("../controllers/content");
const isAuth = require("../middleware/authentication/is-auth");
const passport = require("passport");
const validateContent = require("../middleware/data-validation/content/content-validation");

const catchAsync = require("../middleware/error-handling/catch-async");

router.get(
	"/protected",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		res.status(200).json({
			success: true,
			msg: "You are successfully authenticated to this route!",
		});
	}
);

router.get(
	"/",

	passport.authenticate("jwt", { session: false }),
	catchAsync(contentController.getContent)
);

router.post(
	"/",
	validateContent.contentDataValidation,
	catchAsync(contentController.postAddContent)
);

module.exports = router;
