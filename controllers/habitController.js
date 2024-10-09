const Habit = require('../models/habit.model.js');
const User= require('../models/users.model.js');

// async function getHabits(req, res) {
//     try {
//         const habits = await Habit.find(); // Fetch habits from MongoDB
//         // const habits = await Habit.find({ user: req.user._id })
//         //     .populate('user', 'email', 'password'); // Populating the 'user'

//         res.json(habits); // Send habits data as JSON
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Error fetching habits', error })
//       }    
// }

async function createHabit(req, res) {
  const { name, description, frequency, userId } = req.body;
    try { 
      const newHabit = new Habit({
        name,
        description,
        frequency,   
        user: [userId], // User ID added as an array
        startDate: new Date(), // Automatically set start date to now
      });
        await newHabit.save(); // Save the new habit

        // Updates the user's habits array
        const user = await User.findById(userId); // Find the user by userId
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.habits.push(newHabit._id); 
        await user.save(); // Save the updated user data

        // Respond with a success message and the new habit
        res.json({ message: 'Habit added successfully', habit: newHabit });
        
    } catch (error) {
        res.json({ message: 'Error adding habit', error });
    }    
}

module.exports = {
    createHabit,
};