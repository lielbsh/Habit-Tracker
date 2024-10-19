const Habit = require('../models/habit.model.js');
const User= require('../models/users.model.js');

async function createHabit(req, res) {
  const { name, description, frequency, startDate } = req.body;
  let userId = req.decodedToken.id
    try { 
      const newHabit = new Habit({
        name,
        description,
        frequency,   
        user: [userId], // User ID added as an array
        startDate,
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
  const userId = req.decodedToken.id; // Get userId from decoded token

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

      return res.status(200).json({ message: 'Habit deleted successfully' });
      
  } catch (error) {
      console.error('Error deleting habit:', error);
      return res.status(500).json({ message: 'Server error' });
  }
}

async function updateHabit(req, res) {
  const { updatedHabit } = req.body;
  console.log('updatedHabit', updatedHabit) 
  const userId = req.decodedToken.id; // Get userId from decoded token
  const habitId = updatedHabit._id;

  try {
    // Find the habit by ID
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check if the habit belongs to the user
    if (!habit.user.includes(userId)) {
      return res.status(403).json({ message: 'Unauthorized to update this habit' });
    }

    // Update the habit
    const updatedHabitDocument = await Habit.findByIdAndUpdate(
      habitId, 
      { ...updatedHabit }, // Spread the updatedHabit object to update its fields
      { new: true } // Return the updated document
    );

    return res.status(200).json({ message: 'Habit updated successfully', habit: updatedHabitDocument });

  } catch (error) {
    console.error('Error updating habit:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    createHabit,
    deleteHabit,
    updateHabit,
};