// const User = require('../models/users.model');

// const getUserWithDetails = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//             .populate('habits') // Populates the habits array with Habit documents
//             .populate('analytics'); // Populates the analytics array with Analytics documents

//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         res.status(200).json({ user });
//     } catch (error) {
//         console.error('Error fetching user details:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// module.exports = { getUserWithDetails };