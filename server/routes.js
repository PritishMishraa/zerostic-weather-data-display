import express from "express";

import { getWeatherData } from "./controllers/getWeatherData.js";
import { postWeatherData } from "./controllers/postWeatherData.js";
import { postOpenWeatherMap } from "./controllers/postOpenWeatherMap.js";

const router = express.Router();

router.post("/api", postOpenWeatherMap);

router.get("/weather", getWeatherData);
router.post("/weathers", postWeatherData);

export default router;
