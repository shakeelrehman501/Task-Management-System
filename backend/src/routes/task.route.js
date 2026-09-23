import express from "express"
import { createTask } from "../controllers/task.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()

router.post('/create', isAuthenticated, createTask)


export default router;