const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

// Route to create a new reaction
router.post('/', reactionController.createReaction);

// Route to get a reaction by its id
router.get('/:reactionId', reactionController.getReactionById);

// Route to update a reaction by its id
router.put('/:reactionId', reactionController.updateReaction);

// Route to delete a reaction by its id
router.delete('/:reactionId', reactionController.deleteReaction);

module.exports = router;
