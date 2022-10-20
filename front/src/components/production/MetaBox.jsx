import '../../App.css'
import {useEffect, useContext, useState, Fragment} from 'react'
import { useParams } from "react-router-dom";
import {Context} from '../Reducer.jsx'
import SelectChoice from './SelectChoice.jsx'

const MetaBox = ()=>{
    const[state,dispatch]= useContext(Context)
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    let videoId = useParams()
    let currentVideo = document.getElementById("theatre")
    let [choice, setChoice] = useState()
    let [dilemma, setDilemma] = useState('')
    
    useEffect(() => {
        setChoice(false)
        if(state.videos[0]){state.videos[0].map((item,i) => {
                if(item.id == videoId.id){
                    setUrl(item.url)
                    setTitle(item.title)
                    setDesc(item.description)
                }
            })
            // currentVideo.removeAttribute('loop')
        }
    },[videoId, state.videos[0]])
    
    const startLoop =(()=>{
        state.videos[0] && state.videos[0].map((item,i) => {
            if(item.id === state.choice.loop_id){
                setUrl(item.url)
                setDesc(state.choice.dilemma)
            }
        })
        currentVideo.setAttribute('loop','true')
        setChoice(true)
    })
    
    return (
        <Fragment>
            <SelectChoice movie ={videoId.id} />
            <video id='theatre' src={url} width="480" height="320" preload="auto" autoPlay controlsList="nodownload" controls muted onEnded={startLoop}> Votre navigateur ne prend pas en charge les vidéos HTML5, merci d'utiliser un navigateur plus récent.</video>
            <h1>{title}</h1>
            <h2>{desc}{choice && <span><button>{state.choice.choice_A}</button><button>{state.choice.choice_B}</button></span>}</h2> 
        </Fragment>
    )
}

export default MetaBox