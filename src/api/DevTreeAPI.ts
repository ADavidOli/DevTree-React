import { isAxiosError } from "axios";
import api from "../config/axios";
import type {User, UserHandle } from "../types";
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

export async function updateUser(formData: User) {
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


export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const { data } = await api.post('/user/image', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}


export async function getUserByHandle(handle: string) {
    try {
        // conexion a nuestro api.
        const {data} = await api.get<UserHandle>(`/${handle}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
        throw error;
    }
}


export async function searchByHandle(handle: string) {
    try {
        const {data} = await api.post<string>('/search',{handle});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}