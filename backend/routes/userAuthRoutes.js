const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getOneUser} = require('../controllers/userAuths');
const {protect, authUser} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getOneUser);

module.exports = router
