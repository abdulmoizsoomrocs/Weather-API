const NodeCache = require("node-cache");

// Cache expires after 12 hours
const cache = new NodeCache({
    stdTTL: 43200,
    checkperiod: 600
});

module.exports = cache; 