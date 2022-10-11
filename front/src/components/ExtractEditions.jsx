import { useState, Fragment, useContext, useEffect} from 'react';
import axios from 'axios'
import CheckLength from './LengthChecker'
import BASE_URL from '../config/api.js'
import { Context } from "./Reducer.jsx";

const ExtractEditions= ()=>{
    const [state, dispatch] = useContext(Context)
    let editions =[]
    let edition
    useEffect(() => {
        state.videos[0] && state.videos[0].map((item,i) => {
            edition = {id:item.edition_id, year:item.year}
            editions.push(edition)
        })
        console.log(editions)
        dispatch({type:'editions', payload: editions})
    },[])
    return editions
}

export default ExtractEditions