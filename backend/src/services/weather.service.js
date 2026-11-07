const axios = require("axios");

const { VISUAL_CROSSING_API_KEY } = require("../config/env");

const getWeatherFromAPI = async (city) => {

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`;

    const response = await axios.get(url, {
        params: {
            key: VISUAL_CROSSING_API_KEY,
            unitGroup: "metric",
            contentType: "json"
        }
    });

    return response.data;
};

module.exports = { getWeatherFromAPI };