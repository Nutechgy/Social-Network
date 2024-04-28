const { Reaction } = require('../schema/models');

const reactionController = {
  // Function to create a new reaction
  createReaction: async (req, res) => {
    try {
      const { reactionBody, username } = req.body;
      
      // Create a new reaction
      const newReaction = await Reaction.create({
        reactionBody,
        username,
        // You may need to extract additional data like thoughtId from req.params or req.body
      });

      res.status(201).json(newReaction);
    } catch (error) {
      console.error('Error creating reaction:', error);
      res.status(500).json({ message: 'Failed to create reaction' });
    }
  },

  // Function to get a reaction by its id
  getReactionById: async (req, res) => {
    try {
      const reaction = await Reaction.findById(req.params.reactionId);
      if (!reaction) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
      res.json(reaction);
    } catch (error) {
      console.error('Error getting reaction:', error);
      res.status(500).json({ message: 'Failed to get reaction' });
    }
  },

  // Function to update a reaction by its id
  updateReaction: async (req, res) => {
    try {
      const { reactionBody } = req.body;
      
      // Find the reaction by its id and update it
      const updatedReaction = await Reaction.findByIdAndUpdate(
        req.params.reactionId,
        { reactionBody },
        { new: true }
      );

      if (!updatedReaction) {
        return res.status(404).json({ message: 'Reaction not found' });
      }

      res.json(updatedReaction);
    } catch (error) {
      console.error('Error updating reaction:', error);
      res.status(500).json({ message: 'Failed to update reaction' });
    }
  },

  // Function to delete a reaction by its id
  deleteReaction: async (req, res) => {
    try {
      const deletedReaction = await Reaction.findByIdAndDelete(req.params.reactionId);
      if (!deletedReaction) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
      res.json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting reaction:', error);
      res.status(500).json({ message: 'Failed to delete reaction' });
    }
  }
};

module.exports = reactionController;
