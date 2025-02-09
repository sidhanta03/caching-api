const createCache = (maxSize) => {
    const cache = new Map();
  
    // Add a key-value pair to the cache
    const set = (key, value) => {
      if (cache.size >= maxSize) {
        return false; // Cache is full
      }
      cache.set(key, value);
      return true;
    };
  
    // Retrieve a value by key
    const get = (key) => {
      return cache.get(key);
    };
  
    // Delete a key-value pair
    const remove = (key) => {
      return cache.delete(key);
    };
  
    // Check if the cache is full
    const isFull = () => {
      return cache.size >= maxSize;
    };
  
    // Get the current size of the cache
    const size = () => {
      return cache.size;
    };
  
    // Clear the entire cache
    const clear = () => {
      cache.clear();
    };
  
    return {
      set,
      get,
      remove,
      isFull,
      size,
      clear,
    };
  };
  
  module.exports = createCache;