import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./route/Auth.js";
import PostRoute from "./route/PostRoute.js";
import cors from "cors";
import { connectDb } from "./db/db.js";

const app = express();
dotenv.config();

connectDb();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", PostRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
