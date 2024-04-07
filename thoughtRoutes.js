const { body } = require('express-validator');
const express = require('express');
const router = require('express').Router();
const { Thought,User } = require('../models');
const { createThought } = require('../controllers/thoughtController');

// GET route to get all thoughts
router.get('/', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET route to get a single thought by its _id
  router.get('/:id', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // POST route to create a new thought
  router.post('/', 
   // Input validation middleware
   [
    body('thoughtText').notEmpty().withMessage('Thought text is required'),
    body('username').notEmpty().withMessage('Username is required')
  ],
  createThought
);
  async (req, res) => {
    try {
      // Check if the user exists
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create the thought
      const thought = await Thought.create(req.body);
  
      // Push the thought's id to the user's thoughts array
      user.thoughts.push(thought._id);
      await user.save();
  
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  // PUT route to update a thought by its _id
  router.put('/:id', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // DELETE route to remove a thought by its _id
  router.delete('/:id', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Export the router
  module.exports = router;

module.exports = router;
