// Import necessary modules
const router = require('express').Router();
const { User } = require('../models');

// POST route to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    // Find the user by userId
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the friendId exists
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    // Check if the friend is already in the user's friend list
    if (user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ message: 'Friend already exists in user\'s friend list' });
    }

    // Add the friend to the user's friend list
    user.friends.push(req.params.friendId);
    await user.save();

    res.status(201).json({ message: 'Friend added successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    // Find the user by userId
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the friendId exists in the user's friend list
    if (!user.friends.includes(req.params.friendId)) {
      return res.status(404).json({ message: 'Friend not found in user\'s friend list' });
    }

    // Remove the friend from the user's friend list
    user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
    await user.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
