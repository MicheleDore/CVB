import {useEffect, useContext, useState} from "react"
import { Context } from "./Reducer.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import BASE_URL from '../config/api.js'

const Logout = () => {
    const [state, dispatch] = useContext(Context)
    const navigate = useNavigate();
    const [notif, setNotif] = useState('')
    useEffect(() => {

        axios.get(`${BASE_URL}/logout`)
            .then((res)=>{
                if(res.data.response){
                    dispatch({type:'logout'}) 
                    navigate("/login")
                    setNotif('You are correctly disconnected. See you soon !')
                    setTimeout(()=>{setNotif()},3000)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        
    },[])
    
    return <p>{notif}</p>
};

export default Logout;