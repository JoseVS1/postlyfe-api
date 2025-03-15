const bcrypt = require("bcryptjs");

const genPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = genPassword;