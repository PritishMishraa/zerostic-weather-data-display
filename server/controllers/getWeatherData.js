import { WeatherData } from "../models/WeatherData.js";

export const getWeatherData = async (req, res) => {
  try {
    const weatherData = await WeatherData.find({});

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
