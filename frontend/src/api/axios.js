
import axios from "axios"
// const API_URL = import.meta.env.VITE_API_URL;
// baseURL: "http://localhost:8000/api",

const api = axios.create({
    baseURL: "https://task-management-system-ii5d.vercel.app/api",
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default api;