const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache data for 1 hour

// Middleware to check cache before querying database
const checkCache = (req, res, next) => {
  const cachedData = cache.get(req.originalUrl);
  if (cachedData) {
    return res.json(cachedData);
  }
  next();
};

// Route handler that caches data after querying database
router.get('/users', checkCache, async (req, res) => {
  try {
    const users = await User.find();
    cache.set(req.originalUrl, users);
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

function setCache(key, value) {
    cache[key] = value;
}

function getCache(key) {
    return cache[key];
}

module.exports = { setCache, getCache };
