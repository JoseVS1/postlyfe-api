const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/prismaClient").user;
const validPass = require("../utils/validPass"); 

passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    async function(username, password, done) {
        try {
            const user = await User.findUnique({
                where: {
                    username: username
                }
            });

            if (!user) {
                return done(null, false, {
                    message: "User does not exist."
                });
            };

            if (!validPass(password, user.password)) {
                return done(null, false, {
                    message: "Password is not valid."
                });
            };

            return done(null, user);
        } catch (err) {
            done(err, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findUnique({
            where: {
                id: id
            }
        });

        done(null, user);
    } catch (err) {
        done(err);
    };
});