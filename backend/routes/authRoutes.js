const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('User not found');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/logout', (req, res) => {
  // Invalidate the token on client-side or use a token blacklist for server-side invalidation.
  res.send('Logged out');
});

module.exports = router;
