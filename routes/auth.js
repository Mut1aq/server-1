const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
const auth = require("../middleware/authentication/is-auth");
const validateUser = require("../middleware/data-validation/user/user-validation");

const catchAsync = require("../middleware/error-handling/catch-async");

router.post(
	"/signup",
	validateUser.userDataValidation,
	catchAsync(authController.postSignup)
);

router.post("/login", authController.postLogin);

module.exports = router;
