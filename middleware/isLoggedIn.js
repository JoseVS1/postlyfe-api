const isLoggedIn = (req, res, done) => {
    if (req.user) {
        return done();
    };

    return res.status(401).json({ message: "Unauthorized" });
};

module.exports = isLoggedIn;