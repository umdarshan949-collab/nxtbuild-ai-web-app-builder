import mongoose from "mongoose";

/* ================= MESSAGE SCHEMA ================= */

const messageSchema =
  new mongoose.Schema(
    {
      role: {
        type: String,

        enum: [
          "user",
          "ai",
        ],

        required: true,
      },

      content: {
        type: String,

        required: true,

        trim: true,
      },

      time: {
        type: String,

        default:
          () =>
            new Date().toISOString(),
      },
    },

    {
      _id: false,
    }
  );

/* ================= PROJECT SCHEMA ================= */

const projectSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      title: {
        type: String,

        default:
          "New Project",

        trim: true,

        maxlength: 100,
      },

      code: {
        type: String,

        default: "",
      },

      messages: [
        messageSchema,
      ],
    },

    {
      timestamps: true,
    }
  );

/* ================= INDEXES ================= */

projectSchema.index({
  user: 1,

  createdAt: -1,
});

/* ================= MODEL ================= */

const Project =
  mongoose.model(
    "Project",
    projectSchema
  );

export default Project;