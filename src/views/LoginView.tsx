import AuthNavigation from "../components/AuthNavigation"

function LoginView() {
    return (
        <>
            <h1 className="text-4xl text-white font-bold"> Iniciar Sesion</h1>
            <AuthNavigation
                to="/auth/register"
                text="¿No tienes una cuenta? crea una aquí"
            />
        </>
    )
}

export default LoginView