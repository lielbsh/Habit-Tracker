const express = require('express');
const mongoose = require('mongoose');
const Habit = require('./models/habit.model.js');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');

const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://habitUser:tIPBWJB3NhGf5ZoZ@hebit-tracker-cluster.s1de7.mongodb.net/habit-Tracker-database?retryWrites=true&w=majority&appName=Hebit-Tracker-Cluster'

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send("hello from node API !!");
});

app.get('/habits', async (req, res) => {
    try {
        const habit = await Habit.create(req.body);
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected!');
    app.listen(3000, ()=>{
        console.log("Server is runing on port 3000");
    })
})
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });