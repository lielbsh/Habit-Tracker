const mongoose = require('mongoose');
// const User= require('./users.model.js');

const habitSchema = new mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  }],
  name: {
    type: String,
    required: [true, 'Please add a title for the habit'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
  },
  description: {
    type: String,
    trim: true,
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly'],
    required: [true, 'Please select a frequency'],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  completedDates: [{
    type: Date,
  }],
  streak: {
    type: Number,
    default: 0,
  },
  bestStreak: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

// Create the Habit model
const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
