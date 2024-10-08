const Habit = require('../models/habit.model.js');
const User= require('../models/users.model.js');

const getUser = async (req, res) => {
    console.log(req.params)
    try {
        const user = await User
            .findById(req.params.id)
            .populate('habits')
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

async function getHabits(res) {
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

async function addHabit(req, res) {
    const { name, description, user } = req.body;
    try { 
        const newHabit = new Habit({
             name,
             description,
             user,
             }); 
        await newHabit.save(); 

        // Respond with the newly created habit
        res.json({ message: 'Habit added successfully', habit: newHabit });
    } catch (error) {
        res.json({ message: 'Error adding habit', error });
    }    
}

module.exports = {
    getHabits,
    addHabit,
};