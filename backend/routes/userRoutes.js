const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/create').post(userController.newUser);
router.route('/get').get(userController.getUser);
router.route('/update').patch(userController.updateUser);

module.exports = router;