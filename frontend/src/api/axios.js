
import axios from "axios"
// const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default api;