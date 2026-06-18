// aqui se ven las configuraciones de axios
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// creando el interceptor, para que todos tengan el jwt 
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('Auth_toke');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api;