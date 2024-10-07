const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
// const userController = require('../controllers/userController');

// GET /api/habits - Fetch all habits
router.get('/', (req, res) => habitController.getHabits(res));
router.post('/', habitController.addHabit);

// app.get('/users', userController.getUserWithDetails)

module.exports = router;
