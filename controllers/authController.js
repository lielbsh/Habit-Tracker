const User = require('../models/users.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.JWT_SECRET; // Use the secret from .env file


function createtoken(id){
  return jwt.sign({id}, secret,{
      expiresIn: 3600*48
  });
}


// User Registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
        // Create new user instance
        user = new User({
        username,
        email,
        password, // The password is hashed in the model
        });
        console.log('new user created')

        // Save user to the database
        await user.save();
        console.log('user saved the database')

        // Create token and send the token in a cookie
        let token = createtoken(user._id)
        res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 60*60*1000 });
        res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};


// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ username });
    if (!user) {
      console.log('user not found')
      return res.status(400).json({ message: 'Invalid user name' });
    }

    // Compare the entered password with the hashed password in DB 
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        // Handle error
        console.error('Error comparing passwords:', err);
        return res.status(400).json({ message: 'Invalid Credentials' });
      }

    if (result) {
      // Passwords match, Create token and send the token in a cookie
      let token = createtoken(user._id)
      res.cookie('jwt', token, { httpOnly: false, maxAge: 60*60*1000*48 });
      res.status(201).json({ message: 'Login successful' });
      console.log('Create token and send the token in a cookie')

    } else {
        // Passwords don't match, authentication failed
        console.log('Passwords do not match! Authentication failed.');
        return res.status(400).json({ message: 'Invalid Credentials' }, )
    }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


// Get User Info
exports.getUserInfo = async (req, res) => {
  const userId = req.decodedToken.id
  console.log('userId', userId)
  try {
    const user = await User.findById(userId).select('-password')
    .populate("habits"); // Exclude password from the result
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user); // Return the user information
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.logout = async (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  return res.status(200).json({ message: 'Logout successful' });
}
  