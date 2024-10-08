const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const habitController = require('../controllers/habitController');

// authRouts
router.post('/register', authController.register); // Route for user registration
router.post('/login', authController.login); // Route for user login
router.get('/login', authController.getUserInfo); // Route for user login


// habitsRouts
router.get('/habits', (req, res) => habitController.getHabits(res));
router.post('/habits', habitController.addHabit);


module.exports = router;