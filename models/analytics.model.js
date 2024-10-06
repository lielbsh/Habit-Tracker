const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
        default: 0,
      },
    }],
  }, { timestamps: true });

// Create the Analytics model
const Analytics = mongoose.model('Analytic', analyticsSchema);

module.exports = Analytics;
