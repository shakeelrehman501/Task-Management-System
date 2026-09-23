import express from "express"
import userRoute from "../src/routes/user.routes.js"
import taskRoute from '../src/routes/task.route.js'

const app = express()

app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)

export default app;