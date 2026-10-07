import express from "express";
import userRoute from "../src/routes/user.routes.js";
import taskRoute from "../src/routes/task.route.js";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-management-system-phi-blush.vercel.app",
];

const app = express();
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

export default app;
