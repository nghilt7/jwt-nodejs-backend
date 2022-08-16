import express from "express";
require("dotenv").config();

import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";

const app = express();
const PORT = process.env.PORT || 7070;

// config View
configViewEngine(app);

// init web routes
initWebRoutes(app);

// Listen PORT
app.listen(PORT, () =>
  console.log(
    `>>> ✅ JWT Backend Server is running at PORT: http://localhost:${PORT}`
  )
);
