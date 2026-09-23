import express from "express"
import { createTask, editTask, getTasks } from "../controllers/task.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()

router.post('/create', isAuthenticated, createTask)
router.post('/edit/:id', isAuthenticated, editTask)
router.get('/get', isAuthenticated, getTasks)


export default router;