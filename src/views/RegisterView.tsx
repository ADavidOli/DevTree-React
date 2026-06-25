import AuthNavigation from "../components/nav/AuthNavigation"
import { useForm } from "react-hook-form"
import type { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import { isAxiosError } from "axios";
import api from "../config/axios"; //nuestro cliente axios
import {toast} from 'sonner';
import { useLocation, useNavigate } from "react-router-dom";


const RegisterView = () => {
    
    // definir valores iniciales
    const location = useLocation();
    
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }
    
    const navigate = useNavigate();
    

    // definir los hooks
    const { register, watch, reset ,handleSubmit, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues });

    const password = watch('password'); //forma para ver la variable en cambios con el input

    // definiendo nuestras funciones handle
    const handleRegister = async (formdata: RegisterForm) => {
        // conectar con nuestro backend
        try {
            // los datos de una api siempre van en un data
            const { data } = await api.post(`/auth/register`, formdata)
            // agregando toast.
            // console.log(data);
            toast.success(data.msg);
            // reseteamos el formulario una vez mandado datos al backend
            reset();
            navigate('/auth/login');
        } catch (error) {
            if(isAxiosError(error) && error.response){
                toast.error(error.response.data.msg)
            }
        }
    }


    // definiendo nuestro componentes en el lado del cliente
    return (
        <>
            <h1 className="text-4xl text-white font-bold"> Crear cuenta</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name', {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: "El handle es obligatorio"
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'el password debe ser minimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "la confirmacion es obligatoria",
                            validate: (value) => value === password || 'los passwords no son iguales'

                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}

                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>


            <AuthNavigation
                to="/auth/login"
                text="¿Ya tienes una cuenta? Inicia sesiona aquí"
            />
        </>
    )
}

export default RegisterView