import {useContext, useEffect, Fragment} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Context } from "./Reducer.jsx";
import { adminPath } from '../config/adminpath.js'

const Middleware = ({children}) => {
    const [state, dispatch] = useContext(Context)
    const navigate = useNavigate();

    const location = useLocation()
    const currentPath = location.pathname

    useEffect(() => {
            if(adminPath.includes(currentPath) &&!state.admin){
                navigate('/')
            }
    }, [currentPath]);

    return(
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Middleware