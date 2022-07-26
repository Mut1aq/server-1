const User = require("../models/user");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const options = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: "RESTAPIauthenticationusingpassportjs",
};

module.exports = (passport) => {
	passport.use(
		new JWTStrategy(options, function (jwt_payload, done) {
			console.log(jwt_payload, "*");

			User.findOne({ _id: jwt_payload.userId }, function (err, user) {
				if (err) {
					return done(err, false);
				}
				if (user) {
					console.log("*****");

					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		})
	);
};

// passport.use(
// 	new JWTStrategy(
// 		{
// 			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// 			secretOrKey: "RESTAPIauthenticationusingpassportjs",
// 		},
// 		function (jwtPayload, cb) {
// 			//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
// 			return User.findOneById(jwtPayload.id)
// 				.then((user) => {
// 					return cb(null, user);
// 				})
// 				.catch((err) => {
// 					return cb(err);
// 				});
// 		}
// 	)
// );

// passport.use(
// 	new LocalStrategy(
// 		{
// 			usernameField: "username",
// 			passwordField: "password",
// 		},
// 		function (username, password, cb) {
// 			//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
// 			return UserModel.findOne({ username, password })
// 				.then((user) => {
// 					if (!user) {
// 						return cb(null, false, {
// 							message: "Incorrect username or password.",
// 						});
// 					}
// 					return cb(null, user, {
// 						message: "Logged In Successfully",
// 					});
// 				})
// 				.catch((err) => cb(err));
// 		}
// 	)
// );
