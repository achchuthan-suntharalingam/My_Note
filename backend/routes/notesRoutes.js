const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.route('/create').post(notesController.newNote);
router.route('/getAll').get(notesController.getAllNotes);
router.route('/update').patch(notesController.updateNote);
router.route('/deleteOne').delete(notesController.deleteNote);

module.exports = router;