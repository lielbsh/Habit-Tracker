const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {requireAuth} = require('../middleware/authMiddleware');

// authRouts
router.post('/register', authController.register); // Route for user registration
router.post('/login', authController.login); // Route for user login
router.get('/user', requireAuth ,authController.getUserInfo); // Route for user login
router.get('/logout', requireAuth ,authController.logout); // Route for user login


module.exports = router;