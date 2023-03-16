const { User } = require('../models/user.model');
const { generateUUID, hashPassword, comparePassword } = require('../utils/auth');

const signUp = async (req, res) => {
    const { name, email, contact, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const uuid = generateUUID();
        const [user, created] = await User.findOrCreate(
            {
                where: { contact },
                defaults: { FullName: name, email, contact, password: hashedPassword, uuid: `@e=${uuid}` }
            });
        if (created) {
            res.status(200).json({ message: "success", data: { name, email, contact, uuid } });
        }
        else {
            res.status(200).json({ message: "User already exists!" });

        }
    }
    catch (error) {
        console.log(error);
    }
}

const signIn = async (req, res) => {
    const { contact, password } = req.body;
    try {
        const user = await User.findUserByID(contact)
        if (user) {
            if (await comparePassword(password, user.password)) {
                res.status(200).json({ message: "success", data: { name: user.FullName, email: user.email, contact, uuid: user.uuid } })
            }
            else {
                res.status(200).json({ message: "Invalid Password!" })
            }
        }
        else {
            res.status(200).json({ message: "User not Found" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signUp, signIn };