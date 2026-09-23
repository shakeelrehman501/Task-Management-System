import express from "express"
import { createTask, deleteTask, editTask, getTasks, updateTaskStatus } from "../controllers/task.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()

router.post('/create', isAuthenticated, createTask)
router.post('/edit/:id', isAuthenticated, editTask)
router.get('/get', isAuthenticated, getTasks)
router.delete('/delete/:id', isAuthenticated, deleteTask)
router.patch('/updatestatus/:id', isAuthenticated, updateTaskStatus)


export default router;