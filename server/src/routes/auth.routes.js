import { Router } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

const router = Router();

/* ================= TOKEN ================= */

const signToken = (id) => {
  return jwt.sign(
    { id },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env
          .JWT_EXPIRES_IN ||
        "7d",
    }
  );
};

/* ================= REGISTER ================= */

router.post(
  "/register",

  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      /* Validation */

      if (
        !name ||
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "All fields are required",
          });
      }

      if (
        password.length < 6
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Password must be at least 6 characters",
          });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      /* Check Existing */

      const existingUser =
        await User.findOne({
          email:
            normalizedEmail,
        });

      if (existingUser) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Email already registered",
          });
      }

      /* Hash Password */

      const salt =
        await bcrypt.genSalt(
          10
        );

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      /* Create User */

      const user =
        await User.create({
          name:
            name.trim(),

          email:
            normalizedEmail,

          password:
            hashedPassword,
        });

      /* Token */

      const token =
        signToken(
          user._id
        );

      return res
        .status(201)
        .json({
          success: true,

          user: {
            _id:
              user._id,

            name:
              user.name,

            email:
              user.email,
          },

          token,
        });
    } catch (err) {
      console.error(
        "Register Error:",
        err
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Registration failed",
        });
    }
  }
);

/* ================= LOGIN ================= */

router.post(
  "/login",

  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Email and password are required",
          });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      /* Find User */

      const user =
        await User.findOne({
          email:
            normalizedEmail,
        });

      if (!user) {
        return res
          .status(401)
          .json({
            success: false,

            message:
              "Invalid email or password",
          });
      }

      /* Compare Password */

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res
          .status(401)
          .json({
            success: false,

            message:
              "Invalid email or password",
          });
      }

      /* Token */

      const token =
        signToken(
          user._id
        );

      return res.json({
        success: true,

        user: {
          _id:
            user._id,

          name:
            user.name,

          email:
            user.email,
        },

        token,
      });
    } catch (err) {
      console.error(
        "Login Error:",
        err
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Login failed",
        });
    }
  }
);

export default router;