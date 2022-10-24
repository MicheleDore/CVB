import {useEffect, useContext} from "react"
import { Context } from "./Reducer";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Logout = () => {
    const [state, dispatch] = useContext(Context)
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({type:'logout'}) 
        navigate("/")
    },[])
};

export default Logout;