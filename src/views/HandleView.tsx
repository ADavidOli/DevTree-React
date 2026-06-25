import { Navigate, useParams } from "react-router-dom"
import { getUserByHandle } from "../api/DevTreeAPI"
import { useQuery } from "@tanstack/react-query"
import HandleData from "../components/HandleData"



const HandleView = () => {

    const params = useParams()
    const handle = params.handle!;


    // utilizando useQuery para comunicarnos con nuestra API.
    const {data, error, isLoading} = useQuery({
        queryFn: ()=> getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1
    })
    if(isLoading){
      return <p className="text-center text-white"> cargando...</p>
    }
    if(error){
      return <Navigate to={'/404'}/>
    }
    if(data){
      return <HandleData data={data}></HandleData>
    }
 

  return (
    <div>{data?.email}</div>
  )
}

export default HandleView