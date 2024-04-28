// models/thoughtModel.js

const mongoose = require('mongoose');

// Define the schema for a thought
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
      reactionId: mongoose.Schema.Types.ObjectId,
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
        get: timestamp => new Date(timestamp).toLocaleString()
      }
    }
  ]
});

// Create a virtual field to get the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create and export the Thought model based on the schema
const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
