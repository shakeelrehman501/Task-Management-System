import express from "express"
import { loginUser, logout, registerUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', isAuthenticated, logout)

export default router;