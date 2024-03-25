const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, "process.env.JWT_SECRET", {
    expiresIn: "1d",
  });
};

module.exports = {
  // Mutation: {
  register: async ({ username, email, password }) => {
    try {
      console.log("username", username, "email", email);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = generateToken(newUser);
      console.log("newUser", newUser);
      return {
        user: { username: newUser.username, email: newUser.email },
        token,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = generateToken(user);
      return {
        user: { username: user.username, email: user.email },
        token,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  logout: async ({ req, res }) => {
    try {
      return 'Logged out successfully';
    } catch (error) {
      throw new Error(`Error logging out: ${error.message}`);
    }
  },
  users: async () => await User.find(),
  
  user: async ({ id }) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },
  updateUser: async ({ id, username, email, password }) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new Error('User not found');
      }

      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
 
};
