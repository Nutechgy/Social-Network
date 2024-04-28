// controllers/userController.js
const { User } = require('../models');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create user logic
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: 'Bad Request' });
    }
}

module.exports = { createUser };