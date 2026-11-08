const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/env");
const weatherRoutes = require("./routes/weather.routes");
const redisClient = require("./config/redis");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Weather API is running"
    });
});

// Start server after Redis connection
const startServer = async () => {
    try {
        await redisClient.connect();
        console.log("Redis connected successfully");

        app.listen(PORT, () => {
            console.log(`Weather API running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
