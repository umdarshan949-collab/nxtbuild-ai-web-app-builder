import { Router } from "express";

import Project from "../models/project.model.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

/* ================= AUTH ================= */

router.use(protect);

/* ================= GET ALL PROJECTS ================= */

router.get(
  "/",

  async (req, res) => {
    try {
      const projects =
        await Project.find({
          user:
            req.user._id,
        }).sort({
          updatedAt: -1,
        });

      return res.json({
        success: true,

        projects,
      });
    } catch (err) {
      console.error(
        "Get Projects Error:",
        err
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to fetch projects",
        });
    }
  }
);

/* ================= CREATE PROJECT ================= */

router.post(
  "/",

  async (req, res) => {
    try {
      const project =
        await Project.create({
          user:
            req.user._id,

          title:
            req.body.title ||
            "New Project",

          code: "",

          messages: [],
        });

      return res
        .status(201)
        .json({
          success: true,

          project,
        });
    } catch (err) {
      console.error(
        "Create Project Error:",
        err
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to create project",
        });
    }
  }
);

/* ================= GET SINGLE PROJECT ================= */

router.get(
  "/:id",

  async (req, res) => {
    try {
      const project =
        await Project.findOne({
          _id:
            req.params.id,

          user:
            req.user._id,
        });

      if (!project) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Project not found",
          });
      }

      return res.json({
        success: true,

        project,
      });
    } catch (err) {
      console.error(
        "Get Project Error:",
        err
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to fetch project",
        });
    }
  }
);

/* ================= UPDATE PROJECT ================= */

router.put(
  "/:id",

  async (req, res) => {
    try {
      const allowedUpdates =
        [
          "title",
          "code",
          "messages",
        ];

      const updates =
        {};

      allowedUpdates.forEach(
        (field) => {
          if (
            req.body[
              field
            ] !== undefined
          ) {
            updates[
              field
            ] =
              req.body[
                field
              ];
          }
        }
      );

      const project =
        await Project.findOneAndUpdate(
          {
            _id:
              req.params.id,

            user:
              req.user._id,
          },

          updates,

          { returnDocument: "after" }
        );

      if (!project) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Project not found",
          });
      }

      return res.json({
        success: true,

        project,
      });
    } catch (err) {
      console.error(
        "Update Project Error:",
        err
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to update project",
        });
    }
  }
);

/* ================= DELETE PROJECT ================= */

router.delete(
  "/:id",

  async (req, res) => {
    try {
      const project =
        await Project.findOneAndDelete(
          {
            _id:
              req.params.id,

            user:
              req.user._id,
          }
        );

      if (!project) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Project not found",
          });
      }

      return res.json({
        success: true,

        message:
          "Project deleted successfully",
      });
    } catch (err) {
      console.error(
        "Delete Project Error:",
        err
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to delete project",
        });
    }
  }
);

export default router;