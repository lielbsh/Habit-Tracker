const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    habits: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit"
    }]
    // firstName: {
    //   type: String,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    
},{timestamps: true});

const User = mongoose.model('User', userSchema)
module.exports = User;