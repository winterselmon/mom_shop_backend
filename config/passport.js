const JwtStartegy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
const key = require('../config/keys').secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
opts.secretOrKey = key;

module.exports = passport => {
  passport.use(
    new JwtStartegy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
