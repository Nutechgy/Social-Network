// routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;
