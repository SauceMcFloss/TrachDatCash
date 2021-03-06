// Dependencies
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

// Extract JWT
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Export Passport module
module.exports = passport => {
	passport.use(
		// Define JWT payload
		new JwtStrategy(opts, (jwt_payload, done) => {
			User
				.findById(jwt_payload.id)
				.then(user => {
					if(user){
						return done(null, user);
					}
					return done(null, false);
				})
				.catch(err => console.log(err));
		})
	);
};
