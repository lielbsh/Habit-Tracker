const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const {requireAuth} = require('../middleware/authMiddleware');


// habitsRouts
router.post('/create', requireAuth, habitController.createHabit);
router.delete('/:habitId', requireAuth, habitController.deleteHabit);
router.post('/update', requireAuth, habitController.updateHabit);


module.exports = router;