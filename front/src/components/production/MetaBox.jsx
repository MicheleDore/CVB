import '../../App.css'
import {useEffect, useContext, useState, Fragment} from 'react'
import { useParams } from "react-router-dom";
import {Context} from '../Reducer.jsx'
// import {Theatre} from './Theatre.jsx'

const MetaBox = ()=>{
    const[state,dispatch]= useContext(Context)
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    let videoId = useParams()
 
    useEffect(() => {
        state.videos[0] && state.videos[0].map((item,i) => {
            if(item.id == videoId.id){
                setUrl(item.url)
                setTitle(item.title)
                setDesc(item.description)
            }
        })
         
    },[videoId, state.videos[0]])
    return (
        <Fragment>
            <video src={url} width="480" height="320" preload="auto" autoPlay controlsList="nodownload" controls muted> Votre navigateur ne prend pas en charge les vidéos HTML5, merci d'utiliser un navigateur plus récent.</video>
            
            <h1>{title}</h1>
            <h2>{desc}</h2>
        </Fragment>
    )
}

export default MetaBox