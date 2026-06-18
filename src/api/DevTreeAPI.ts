import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User } from "../types";
// aqui vamos a hacer la funcion para comunicarnos con el servidor

export async function getUser() {
    try {
        // el interceptor siempre mandara el dato en la consulta de la api
        const {data} = await api<User>('/user');
        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}