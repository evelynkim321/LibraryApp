// authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // User login
  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Proceed with JWT generation if credentials are valid
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  //process.env.SECRET_KEY