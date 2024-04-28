const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the reaction schema
const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString()
  }
});

// Create the Reaction model
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
