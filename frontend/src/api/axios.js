
import axios from "axios"
// baseURL: "https://task-management-system-ii5d.vercel.app/api",

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default api;