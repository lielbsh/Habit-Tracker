const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const habitController = require('../controllers/habitController');

// authRouts
router.post('/register', authController.register); // Route for user registration
router.post('/login', authController.login); // Route for user login
router.get('/login', authController.getUserInfo); // Route for user login

// habitsRouts
// router.get('/habits', (req, res) => habitController.getHabits(res));
router.post('/habits/create', habitController.createHabit);
router.delete('/habits/:habitId', habitController.deleteHabit);
router.post('/habits/update', habitController.updateHabit);

module.exports = router;