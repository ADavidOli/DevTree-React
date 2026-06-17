import { useForm } from "react-hook-form"
import AuthNavigation from "../components/AuthNavigation"
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";

function LoginView() {
    // definiendo los types
    const initialValues : LoginForm = {
        email: '',
        password: ''
    }
    // obteniendo los hooks
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
    // definiendo funciones
    const handleLogin = async(formdata:LoginForm)=>{
        try {
            const {data} = await api.post('/auth/login', formdata)
            toast(data);
        } catch (error) {
            if(isAxiosError(error) && error.response){
                toast.error(error.response.data.msg);
            }
        }
    }


    return (
        <>
            <h1 className="text-4xl text-white font-bold"> Iniciar Sesion</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
                noValidate
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />
            </form>


            <AuthNavigation
                to="/auth/register"
                text="¿No tienes una cuenta? crea una aquí"
            />
        </>
    )
}

export default LoginView