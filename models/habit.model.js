const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  streak: {
    type: Number,
    default: 0,
  },
},{timestamps: true});

// Create the Habit model
const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
