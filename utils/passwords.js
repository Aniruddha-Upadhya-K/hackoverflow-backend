const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (password) => {
    return bcrypt.hash(password, process.env.SALT_ROUNDS)
        .then(res => res)
        .catch(error => console.log(error));
}

module.exports = hashPassword;