import { useParams } from "react-router-dom"
import { getUserByHandle } from "../api/DevTreeAPI"
import { useQuery } from "@tanstack/react-query"



const HandleView = () => {

    const params = useParams()
    const handle = params.handle!;


    // utilizando useQuery para comunicarnos con nuestra API.
    const {data, error, isLoading} = useQuery({
        queryFn: ()=> getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1
    })

    console.log(isLoading);
    console.log(error);
    console.log(data);

  return (
    <div>HandleView</div>
  )
}

export default HandleView