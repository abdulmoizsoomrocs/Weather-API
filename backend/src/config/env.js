require("dotenv").config();

const PORT = process.env.PORT;
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY;
module.exports = { 
    PORT,
    VISUAL_CROSSING_API_KEY
 }; 

