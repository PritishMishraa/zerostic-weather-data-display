import { WeatherData } from "../models/WeatherData.js";

export const postWeatherData = async (req, res) => {
  try {
    const { cord } = req.body;

    const newDocs = req.body.data.map((weather) => {
      return {
        lon: cord.longitude,
        lat: cord.latitude,
        date: weather.date,
        temp: weather.temp,
        feels_like: weather.feels_like,
        temp_min: weather.temp_min,
        temp_max: weather.temp_max,
        pressure: weather.pressure,
        humidity: weather.humidity,
      };
    });

    await WeatherData.deleteMany({});
    await WeatherData.insertMany(newDocs);

    res.status(201).json({ message: "Weather data saved successfully" });

  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};
