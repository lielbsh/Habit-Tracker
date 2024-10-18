require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const habitsRoutes = require('./routes/habitsRoutes');
const app = express()

// Middleware
const corsOptions = {
    origin: function (origin, callback) {
        callback(null, origin);
    },
    method: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); 

// connect to mongodb 
const dbURI = 'mongodb+srv://habitUser:tIPBWJB3NhGf5ZoZ@hebit-tracker-cluster.s1de7.mongodb.net/habit-Tracker-database?retryWrites=true&w=majority&appName=Hebit-Tracker-Cluster'

app.use(express.static('public'));

// Connect to MongoDB and Start Serv
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,    
})
  .then(() => {
    app.listen(8000, ()=>{
        console.log("Server is runing");
    })
})
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });


// Use Routes
// app.get('*', checkUser)
app.use('/', authRoutes);
app.use('/habits', habitsRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});



module.exports = app;