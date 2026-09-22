import express from "express"
import userRoute from "../src/routes/user.routes.js"

const app = express()

app.use(express.json())

app.use('/api/user', userRoute)

export default app;