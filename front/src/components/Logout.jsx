import {useEffect, useContext} from "react"
import { Context } from "./Reducer.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [state, dispatch] = useContext(Context)
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch({type:'logout'}) 
        navigate("/")
    },[])
};

export default Logout;