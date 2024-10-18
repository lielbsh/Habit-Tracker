const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require('../models/users.model');

// Ensure secret exists
if (!secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt; // Get JWT from cookies
  // If token exists, verify it
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log('Token verification failed:', err);
        return res.status(401).json({ message: 'Unauthorized access' }); // Send 401 status
      } else {
        req.decodedToken = decodedToken; // Attach the decoded token to the request
        next(); // Proceed to next middleware or route handler
      }
    });
  } else {
    // No token found, respond with 401 status
    return res.status(401).json({ message: 'No token provided, unauthorized access' });
  }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
              } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
              }
            });
          } else {
            res.locals.user = null;
            next();
          }
        };

module.exports = { requireAuth };
