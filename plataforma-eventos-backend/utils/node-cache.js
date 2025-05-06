const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 180 });

const setCache = (key, value) => cache.set(key, value);
const getCache = (key) => cache.get(key);
const delCache = (key) => cache.del(key);

module.exports = {
    setCache,
    getCache,
    delCache
};