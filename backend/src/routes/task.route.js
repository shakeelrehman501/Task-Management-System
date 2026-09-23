import express from "express"
import { createTask, editTask } from "../controllers/task.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()

router.post('/create', isAuthenticated, createTask)
router.post('/edit/:id', isAuthenticated, editTask)


export default router;