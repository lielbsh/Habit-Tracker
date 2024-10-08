require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/usersRoutes');
const Routes = require('./routes/authRoutes');

const app = express()

// Middleware
app.use(cors());
app.use(express.json());

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
    app.listen(8000, ()=>{
        console.log("Server is runing");
    })
})
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });


// Use Routes
app.use('/', Routes);


// Simple Test Route
// app.get('/', (req, res) => {
//   res.send("Hello from Habit Tracker API!!");
// });

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});


module.exports = app;