import cors from "cors";
import express from "express";
import routes from "./routes.js";
import err404 from "./errors/err404.js";
import error from "./errors/errorHandler.js";

/** The Express app */
const app = express();
app.use(express.json());
app.use(cors());

// Redirect the root URL to the github repository
app.get("/", (_req, res) => {
  res.redirect("https://github.com/PritishMishraa/ideas-grab-api");
});

app.use(routes);

app.use((_req, _res, next) => next(err404));

app.use(error);

export default app;
