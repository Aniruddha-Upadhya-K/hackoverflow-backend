const express = require('express');
const router = express.Router();
const multer = require('multer');
const { User } = require('../models/user.model')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads')
    },
    filename: async function (req, file, cb) {
        file.filename += await User.getUUID(req.body.contact)
    }
})

const upload = multer({ storage: storage })
const { signUp, signIn } = require('../controllers/user.controller');

router.post('/api/signUp', upload.single('profile_img'), signUp);
router.post('/api/signIn', signIn);

module.exports = router;

