
import axios from "axios"

const api = axios.create({
    baseURL: "https://task-management-system-ii5d.vercel.app/",
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default api;