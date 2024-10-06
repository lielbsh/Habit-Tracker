require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const Habit = require('../models/habit.model.js');

// Import Routes
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/usersRoutes');
// const habitRoutes = require('./routes/habitRoutes');

const app = express()

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/auth', authRoutes);


// Simple Test Route
app.get('/', (req, res) => {
  res.send("Hello from Habit Tracker API!!");
});

// app.get('/habits', async (req, res) => {
//     try {
//         const habit = await Habit.create(req.body);
//         res.status(200).json(habit);
//     } catch (err) {
//         res.status(500).json({message: err.message})
//     }
// })


// connect to mongodb 
const dbURI = 'mongodb+srv://habitUser:tIPBWJB3NhGf5ZoZ@hebit-tracker-cluster.s1de7.mongodb.net/habit-Tracker-database?retryWrites=true&w=majority&appName=Hebit-Tracker-Cluster'

app.use(express.static('public'));


// Connect to MongoDB and Start Serv
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,    
})
  .then(() => {
    console.log('Connected!');
    app.listen(3000, ()=>{
        console.log("Server is runing on port 3000");
    })
})
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });