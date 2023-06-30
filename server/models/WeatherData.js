import { Schema, model } from "mongoose";

const WeatherDataSchema = new Schema({
  lon: { type: Number, required: true },
  lat: { type: Number, required: true },
  date: { type: String, required: true },
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  temp_min: { type: Number, required: true },
  temp_max: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
});

export const WeatherData = model("WeatherData", WeatherDataSchema);
