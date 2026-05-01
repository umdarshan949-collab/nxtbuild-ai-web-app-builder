import express from "express";

import cors from "cors";

import routes from "./routes/index.js";

import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

const app = express();

/* ================= CORS ================= */

app.use(
  cors({
    origin:
      process.env
        .CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,
  })
);

/* ================= BODY PARSER ================= */

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.json({
    success: true,

    message:
      "Server is running",
  });
});

/* ================= API ROUTES ================= */

app.use("/api", routes);

/* ================= 404 ================= */

app.use(notFoundHandler);

/* ================= ERROR ================= */

app.use(errorHandler);

export default app;