const bcrypt = require('bcrypt');
const { User } = require('../models');

// Function to authenticate user credentials
const authenticateUser = async (email, password) => {
  try {
    // Find the user by their email
    const user = await User.findOne({ where: { email } });

    // If user is not found, return null
    if (!user) {
      return null;
    }

    // Compare the provided password with the stored password hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, return the authenticated user
    if (passwordMatch) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Error authenticating user');
  }
};

module.exports = { authenticateUser };
