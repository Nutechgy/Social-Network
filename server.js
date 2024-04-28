const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes'); // Import reaction routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/thoughts/:thoughtId/reactions', reactionRoutes); // Use reaction routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
