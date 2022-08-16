import express from "express";
require("dotenv").config();
import bodyParser from "body-parser";

import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";

const app = express();
const PORT = process.env.PORT || 7070;

// config View
configViewEngine(app);

// config body parser to get req from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// init web routes
initWebRoutes(app);

// Listen PORT
app.listen(PORT, () =>
  console.log(
    `>>> ✅ JWT Backend Server is running at PORT: http://localhost:${PORT}`
  )
);
