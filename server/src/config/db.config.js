import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI is missing in .env"
      );
    }

    mongoose.set(
      "strictQuery",
      true
    );

    const conn =
      await mongoose.connect(
        mongoURI
      );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

    mongoose.connection.on(
      "error",
      (err) => {
        console.error(
          "MongoDB Runtime Error:",
          err
        );
      }
    );

    mongoose.connection.on(
      "disconnected",
      () => {
        console.warn(
          "MongoDB Disconnected"
        );
      }
    );
  } catch (error) {
    console.error(
      "MongoDB Connection Error:",
      error.message
    );

    process.exit(1);
  }
};

export default connectDB;