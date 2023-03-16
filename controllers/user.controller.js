const UserModel = require('../models/user.model');

const signUp = async (req, res)=>{
    const {name, email, contact, password} = req.body;
    const user = new UserModel();
    user.createUser({name, email, contact, password});
}