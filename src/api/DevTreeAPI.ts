import { isAxiosError } from "axios";
import api from "../config/axios";
import type { ProfileForm, User } from "../types";
// aqui vamos a hacer la funcion para comunicarnos con el servidor

export async function getUser() {
    try {
        // el interceptor siempre mandara el dato en la consulta de la api
        const { data } = await api<User>('/user');
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}

export async function updateUser(formData: ProfileForm) {
    try {
        // el interceptor siempre mandara el dato en la consulta de la api
        const { data } = await api.patch<string>('/user', formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}


export async function uploadImage(file:File) {
    const formData = new FormData();
    formData.append('file',file);

    try {
        const {data} = await api.post('/user/image', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}