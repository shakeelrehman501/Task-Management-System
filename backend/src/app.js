import express from "express";
import userRoute from "../src/routes/user.routes.js";
import taskRoute from "../src/routes/task.route.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

export default app;
