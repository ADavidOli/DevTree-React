import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import { Navigate } from "react-router-dom";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    // trabajando con tanStack
    const {data, isLoading, isError} = useQuery({
        // configuraciones
        queryFn: getUser,
        queryKey:['user'],
        retry: 2,
        refetchOnWindowFocus: false
    })
    if(isLoading)return 'cargando...';
    if(isError){
        return <Navigate to={'/auth/login'}/>
    }


    if(data) return (
      <DevTree data={data}/>
    )
}