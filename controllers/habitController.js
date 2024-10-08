const Habit = require('../models/habit.model.js');
const User= require('../models/users.model.js');

const createHabitForUser = async (userId, habitData) => {
    try {
      // Create a new habit
      const newHabit = await Habit.create({
        user: userId,
        ...habitData
      });
        // Find the user and add the new habit's ID to habits array
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { habits: newHabit._id } }, // Add habit ID to the user's habits array
        { new: true }
      );
      console.log('Habit created and added to user:', user);
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  };
  

async function getHabits(req, res) {
    try {
        const habits = await Habit.find(); // Fetch habits from MongoDB
        // const habits = await Habit.find({ user: req.user._id })
        //     .populate('user', 'email', 'password'); // Populating the 'user'

        res.json(habits); // Send habits data as JSON
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching habits', error })
      }    
}

async function createHabit(req, res) {
    const { name, description, user } = req.body;
    try { 
        const newHabit = new Habit({
             name,
             description,
             user,
             }); 
        await newHabit.save(); 
        res.json({ message: 'Habit added successfully', habit: newHabit });
        
    } catch (error) {
        res.json({ message: 'Error adding habit', error });
    }    
}

module.exports = {
    getHabits,
    createHabit,
};