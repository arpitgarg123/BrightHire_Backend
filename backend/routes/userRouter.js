const express = require('express');
const { register, login, updateProfile, logout } = require('../controllers/userController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/register',upload.single('file'),register);
router.post("/login", login);
router.post("/profile/update",isLoggedIn,upload.single('file'),updateProfile);
router.get('/logout', logout);

module.exports = router;