import '../../App.css'
import {useEffect, useContext, useState, Fragment} from 'react'
import { useParams } from "react-router-dom";
import {Context} from '../Reducer.jsx'
const Theatre = ()=>{
    const[state,dispatch]= useContext(Context)
    const [url, setUrl] = useState('')
    const [mainVideo, setMainVideo] = useState({})
    let videoId = {}
    videoId = useParams()
 
    useEffect(() => {
        console.log(mainVideo)
        // console.log(mainVideo)
        state.videos[0] && state.videos[0].map((item,i) => {
            console.log(item.url)
            if(item.id == mainVideo.id){
                console.log(true)
                return setUrl(item.url)
            } else {
                console.log(item.id)
                console.log(mainVideo.id)
            }
            })
        console.log(url)
    },[state.videos[0]])
    return (
        <Fragment>
            <video src={url} width="480" height="320" preload="auto" controls muted> Votre navigateur ne prend pas en charge les vidéos HTML5, merci d'utiliser un navigateur plus récent.</video>
        </Fragment>
    )
}

export default Theatre