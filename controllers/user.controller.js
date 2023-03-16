const { User } = require('../models/user.model');
const { generateUUID, hashPassword } = require('../utils/auth');

const signUp = async (req, res) => {
    const { name, email, contact, password } = req.body;
    try {
        const users = await User.findAll({ where: { contact } })
        if (users.length !== 0) {
            res.status(200).json({ message: "User already exists!" })
        }
        else {
            const hashedPassword = await hashPassword(password);
            const uuid = generateUUID();
            User.create({ FullName: name, email, contact, password: hashedPassword, uuid: `@e=${uuid}` })
            res.status(200).json({ message: "success", data: { name, email, uuid, contact } })
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { signUp };