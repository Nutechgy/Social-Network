// routes/userRoutes.js
const express = require('express');
const router =('express').Router();
const { body } = require('express-validator');
const  {User,Thought} = require('../models/user');
const { createUser } = require('../controllers/userController');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/',
[
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email must be a valid email address')
  ],
 async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a user by id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE to remove user by id
router.delete('/:id', async (req, res) => {
  try {
    // Find the user by id and store it in a variable
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // Check if user is found and then delete associated thoughts
    if (deletedUser) {
      await Thought.deleteMany({ username: deletedUser.username });

      res.status(200).json({ message: 'User and associated thoughts deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);

  }
});
// Export the router
module.exports = router;
