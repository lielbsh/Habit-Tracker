const { update } = require('lodash');
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
        console.log('new habit saved', newHabit)
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

async function deleteHabit(req, res) {
  const { habitId } = req.params;
  const userId = req.headers['user-id'];  // Extract userId from request headers

  try {
      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      const habitToDelete = await Habit.findById(habitId);
      if (!habitToDelete) {
          return res.status(404).json({ message: 'Habit not found' });
      }

      await User.findByIdAndUpdate(userId, { $pull: { habits: habitId } });
      await Habit.findByIdAndDelete(habitId);

      const updatedUser = await User.findById(userId).populate('habits');
      const updatedHabits = updatedUser.habits;
      console.log('updatedHabits',updatedHabits)
      console.log('updatedUser', updatedUser)
      return res.status(200).json({ message: 'Habit deleted successfully', habits: updatedHabits });
  } catch (error) {
      console.error('Error deleting habit:', error);
      return res.status(500).json({ message: 'Server error' });
  }
}

async function completeHabit(req, res) {
  const { habit } = req.body; 
  const userId = habit.user; 
  const habitId = habit._id;

  try { 
    // Update the existing habit
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId, // Correctly use habitId
      {
        startDate: new Date(),
        completedDates: [] 
      },
      { new: true } // This option returns the updated document
    );
    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    console.log('Habit updated', updatedHabit);

    // Updates the user's habits array
    const user = await User.findById(userId); // Find the user by Id

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Im not updating the user's habits array, it will updated when user logout. See updateuser function
    
    return res.status(200).json({ message: 'Habit completed', updatedHabit });
  } catch (error) {
    console.error('Error completing habit:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    createHabit,
    deleteHabit,
    completeHabit,
};