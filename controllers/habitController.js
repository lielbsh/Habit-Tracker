const Habit = require('../models/habit.model.js');
const User= require('../models/users.model.js');

async function getHabits(res) {
    try {
        const habits = await Habit.find(); // Fetch habits from MongoDB
        res.json(habits); // Send habits data as JSON
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching habits', error })
      }    
}

async function addHabit(req, res) {
    const { name, description } = req.body;
    try { 
        const newHabit = new Habit({
             name,
             description,
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