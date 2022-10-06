import {useContext, useEffect, Fragment} from "react"
import { Context } from "./Reducer.jsx"
import axios from 'axios'
import BASE_URL from '../config/api.js'

const VideoList = ({children}) => {
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
        axios.get(`${BASE_URL}`)
            .then((res)=>{
                if(res.data.response){
                    dispatch({type:'videopick', payload: res.data.videos}) 
                    console.log(res.data.videos[0])
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