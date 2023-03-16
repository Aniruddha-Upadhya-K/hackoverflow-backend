const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10)
        .then(res => res)
        .catch(error => error);
}

const comparePassword = async (password, comparePass) => {
    return bcrypt.compare(password, comparePass)
}

const { v4: uuidv4 } = require('uuid');

const generateUUID = ()=>{
    return uuidv4();
}


module.exports = {hashPassword, generateUUID, comparePassword};