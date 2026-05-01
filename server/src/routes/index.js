import { Router } from "express";

import authRoutes from "./auth.routes.js";

import projectRoutes from "./project.routes.js";

import generateRoutes from "./generate.routes.js";

const router = Router();

/* ================= HEALTH CHECK ================= */

router.get("/", (req, res) => {
  res.json({
    success: true,

    message:
      "API is running successfully",
  });
});

/* ================= ROUTES ================= */

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/projects",
  projectRoutes
);

router.use(
  "/generate",
  generateRoutes
);

export default router;