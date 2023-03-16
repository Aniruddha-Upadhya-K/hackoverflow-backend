const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10)
        .then(res => res)
        .catch(error => console.log(error));
}

const { v4: uuidv4 } = require('uuid');

const generateUUID = ()=>{
    return uuidv4();
}


module.exports = {hashPassword, generateUUID};