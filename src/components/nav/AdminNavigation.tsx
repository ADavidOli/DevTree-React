import { useQueryClient } from "@tanstack/react-query";

const AdminNavigation = () => {


    const querClient = useQueryClient();

    const logout = ()=>{
        localStorage.removeItem('Auth_toke');
        querClient.invalidateQueries({queryKey:['user']});

    }


    return (
        <>
            <button
                className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                onClick={logout}
            >
                Cerrar Sesión
            </button>
        </>
    )
}

export default AdminNavigation