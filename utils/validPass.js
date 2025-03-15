const bcrypt = require("bcryptjs");

const validPass = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
};

module.exports = validPass;