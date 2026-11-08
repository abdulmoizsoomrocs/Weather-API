const { getWeatherFromAPI } = require("../services/weather.service");

const getWeather = async (req, res) => {

    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }

        const weatherData = await getWeatherFromAPI(city);

        return res.status(200).json({
            success: true,
            data: {
                city: weatherData.resolvedAddress,
                temperature: weatherData.currentConditions.temp,
                condition: weatherData.currentConditions.conditions,
                humidity: weatherData.currentConditions.humidity,
                windSpeed: weatherData.currentConditions.windspeed,
                feelsLike: weatherData.currentConditions.feelslike
            }
        });

    } catch (error) {

        console.error("Weather API Error:", error.message);
 
        if (error.response?.status === 400) {
            return res.status(400).json({
                success: false,
                message: "Invalid city or weather request"
            });
        }

        return res.status(502).json({
            success: false,
            message: "Unable to fetch weather data"
        });
    }
};

module.exports = { getWeather };