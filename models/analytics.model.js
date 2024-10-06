const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  totalHabits: {
    type: Number,
    default: 0,
  },
  completedHabits: {
    type: Number,
    default: 0,
  },
  streakRecords: [{
    date: {
      type: Date,
      default: Date.now,
    },
    streak: {
      type: Number,
    },
  }],
},{timestamps: true});

// Create the Analytics model
const Analytics = mongoose.model('Analytic', analyticsSchema);

module.exports = Analytics;
