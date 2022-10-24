import '../../App.css'
import {Fragment, useEffect, useContext} from 'react'
import { Context } from "../Reducer.jsx"
import axios from 'axios'
import BASE_URL from '../../config/api.js'

const SelectChoice = (props)=>{
    const [state, dispatch] = useContext(Context)
    useEffect(() => {
        axios.get(`${BASE_URL}/metabox/${props.movie}`)
        .then((res)=>{
            if(res.data.response){
                dispatch({type:'choicepick', payload: res.data.choice[0]})
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [props.movie]);
    return (
        <Fragment>

        </Fragment>
    )
}

export default SelectChoice