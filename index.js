const express = require('express');
const createCache = require('./cache');

const app = express();
const PORT = 3000;

// Initialize cache with a max size of 10
const cache = createCache(10);

// Middleware 
app.use(express.json());

// POST /cache 
app.post('/cache', (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) {
    return res.status(400).json({ error: 'Key and value are required' });
  }

  if (cache.isFull()) {
    return res.status(400).json({ error: 'Cache is full' });
  }

  const success = cache.set(key, value);
  if (!success) {
    return res.status(400).json({ error: 'Failed to add to cache' });
  }

  res.status(201).json({ message: 'Key-value pair added to cache' });
});

// GET /cache/{key} -> Retrieve a value by key
app.get('/cache/:key', (req, res) => {
  const { key } = req.params;
  const value = cache.get(key);

  if (value === undefined) {
    return res.status(404).json({ error: 'Key not found in cache' });
  }

  res.status(200).json({ key, value });
});

// DELETE /cache/{key} -> Remove a key-value pair
app.delete('/cache/:key', (req, res) => {
  const { key } = req.params;
  const deleted = cache.remove(key);

  if (!deleted) {
    return res.status(404).json({ error: 'Key not found in cache' });
  }

  res.status(200).json({ message: 'Key-value pair deleted from cache' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});