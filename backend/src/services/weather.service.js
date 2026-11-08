const axios = require("axios");

const { VISUAL_CROSSING_API_KEY } = require("../config/env");
const cache = require("../config/cache");

const getWeatherFromAPI = async (city) => {
    const startTime = performance.now();
    const normalizedCity = city.trim();
    const cacheKey = `weather:${normalizedCity.toLowerCase()}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        const responseTime = (performance.now() - startTime).toFixed(2);
        console.log(`CACHE HIT: ${normalizedCity} (${responseTime} ms)`);
        return cachedData;
    }

    console.log(`CACHE MISS: ${normalizedCity}`);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(normalizedCity)}`;

    const response = await axios.get(url, {
        params: {
            key: VISUAL_CROSSING_API_KEY,
            unitGroup: "metric",
            contentType: "json"
        }
    });

    cache.set(cacheKey, response.data);

    const responseTime = (performance.now() - startTime).toFixed(2);
    console.log(`API response time for ${normalizedCity}: ${responseTime} ms`);

    return response.data;
};

module.exports = { getWeatherFromAPI };