const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
// const secret = process.env.JWT_SECRET; // Use the secret from .env file

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
        password,
        });
        console.log('new user created')
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to the database
        await user.save();
        console.log('user saved the database')
        // Create JWT payload
        const payload = {
        user: {
            id: user.id,
        },
        };
        console.log('payload:',payload)
        // Sign JWT and send it in response
        jwt.sign(
        payload,
        secret,
        { expiresIn: '1h' },
        (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        }
        );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
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
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    // Check if password matches (for now, plain text comparison)
    if (password === user.password) {
      console.log('Password is correct');
      res.json({
        message: 'Login successful',
        userId: user._id,  // Send user ID
      });
    } else {
      // Password mismatch
      return res.json({ message: 'Password is incorrect' });
    }


    // Compare entered password with hashed password in DB
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid Credentials' });
    // }

    // Create JWT payload
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };

    // Sign JWT and send it in response
//     jwt.sign(
//       payload,
//       secret,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


// Get User Info
exports.getUserInfo = async (req, res) => {
    const userId = req.query.userId; 

    try {
      const user = await User.findById(userId).select('-password')
      .populate("habits"); // Exclude password from the result
      if (!user) {
        console.log('User not found')
        return res.status(404).json({ message: 'User not found' });
      } else {
        console.log('Return the user information :)', user)
        res.json(user); // Return the user information
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  