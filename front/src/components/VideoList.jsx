import {useContext, useEffect, Fragment} from "react"
import { Context } from "./Reducer.jsx"
import axios from 'axios'
import BASE_URL from '../config/api.js'

/*Ce composant interroge la BDD pour récuperer tous les information relatives 
    au vidéos stockées et à l'edition à laquelle elles appartiennes et stocke tout dans le reducer*/

const VideoList = ({children}) => {
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
        axios.get(`${BASE_URL}`)
            .then((res)=>{
                if(res.data.response){
                    dispatch({type:'videopick', payload: res.data.videos}) 
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }, []);

    return(
        <Fragment>
            {children}
        </Fragment>
    )
}

export default VideoList