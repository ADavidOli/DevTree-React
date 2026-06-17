// aqui se ven las configuraciones de axios
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default api;