import {useEffect, useContext} from "react"
import { Context } from "./Reducer";
import { useNavigate } from "react-router-dom";
import axios from "axios"

/*Ce composant efface le token dédié à la persistence de la session,
indique au reduceur de mettre le state à jour et renvoie à la Homapage*/

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