const User = require('../models/user'); // Import the User model

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body; // Destructure data from the request body
    const newUser = await User.create({
      username,
      password,
      role,
    });
    res.status(201).json(newUser); // Return the newly created user
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error }); // Error handling
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.status(200).json(users); // Return the list of users
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error }); // Error handling
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by primary key (ID)
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If not found, return 404
    }
    res.status(200).json(user); // Return the found user
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error }); // Error handling
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If not found, return 404
    }
    const updatedUser = await user.update(req.body); // Update the user with new data
    res.status(200).json(updatedUser); // Return the updated user
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error }); // Error handling
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If not found, return 404
    }
    await user.destroy(); // Delete the user from the database
    res.status(200).json({ message: 'User deleted successfully' }); // Success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error }); // Error handling
  }
};
