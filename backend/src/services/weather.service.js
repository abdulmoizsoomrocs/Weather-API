const axios = require("axios");

const { VISUAL_CROSSING_API_KEY } = require("../config/env");
const redisClient = require("../config/redis");

const getWeatherFromAPI = async (city) => {
    const startTime = performance.now();

    const normalizedCity = city.trim();
    const cacheKey = `weather:${normalizedCity.toLowerCase()}`;

    // Check Redis cache
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        const responseTime = (performance.now() - startTime).toFixed(2);

        console.log(`REDIS CACHE HIT: ${normalizedCity} (${responseTime} ms)`);

        return JSON.parse(cachedData);
    }

    console.log(`REDIS CACHE MISS: ${normalizedCity}`);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(normalizedCity)}`;

    const response = await axios.get(url, {
        params: {
            key: VISUAL_CROSSING_API_KEY,
            unitGroup: "metric",
            contentType: "json"
        }
    });

    const weatherData = response.data;

    // Store weather data in Redis for 12 hours
    await redisClient.setEx(
        cacheKey,
        43200,
        JSON.stringify(weatherData)
    );

    const responseTime = (performance.now() - startTime).toFixed(2);

    console.log(`REDIS CACHE SET: ${normalizedCity}`);
    console.log(`API response time: ${responseTime} ms`);

    return weatherData;
};

module.exports = { getWeatherFromAPI };