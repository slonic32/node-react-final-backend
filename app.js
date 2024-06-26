import express from "express";
import morgan from "morgan";
import cors from "cors";
//import dotenv from "dotenv";
import "dotenv/config";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import docsRouter from "./routes/docsRouter.js";

//dotenv.config();

try {
  await mongoose.connect(process.env.mongodbURI);
  console.log("Database connection successful");
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/docs", docsRouter);
app.use(express.static("public"));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running. Use our API on port: ", +process.env.PORT);
});
