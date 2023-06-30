const { OPEN_WEATHER_MAP_API_KEY } = process.env;

export async function postOpenWeatherMap(req, res) {
  try {
    const { lat, lon } = req.body;

    const openWeatherMap = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`
    );

    const openWeatherMapJson = await openWeatherMap.json();

    res.status(200).json(openWeatherMapJson);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
