const getWeather = (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({
            success: false,
            message: "City is required"
        });
    }

    const weatherData = {
        city,
        temperature: 30,
        condition: "Sunny",
        humidity: 65,
        windSpeed: 12
    };

    return res.status(200).json({
        success: true,
        data: weatherData
    });
};

module.exports = { getWeather };