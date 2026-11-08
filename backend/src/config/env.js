const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY;
const REDIS_URL = process.env.REDIS_URL;

module.exports = {
    PORT,
    VISUAL_CROSSING_API_KEY,
    REDIS_URL
};