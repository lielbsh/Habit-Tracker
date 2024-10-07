const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const mid

router.post('/register', authController.register); // Route for user registration
router.post('/login', authController.login); // Route for user login
router.get('/me', authController.getUserInfo); // Route for user info

module.exports = router;