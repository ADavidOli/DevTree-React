import { isAxiosError } from "axios";
import api from "../config/axios";
// aqui vamos a hacer la funcion para comunicarnos con el servidor

export async function getUser() {
    const token = localStorage.getItem('Auth_toke')
    try {
        const {data} = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}