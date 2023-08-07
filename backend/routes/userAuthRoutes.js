const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/userAuths');
const {protect} = require('../middleware/authMiddleware');

router.post('/register', registerUser)

module.exports = router
