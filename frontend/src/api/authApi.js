import api from "./axios";

export const register = async(payload)=>{
    const {data} = await api.post('/register', payload);
    return data;
}