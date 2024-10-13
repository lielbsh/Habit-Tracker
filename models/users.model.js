const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt');

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
    
},{timestamps: true});


// Hashing password only when creating or updating the password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {  // Check if the password has been modified
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema)
module.exports = User;