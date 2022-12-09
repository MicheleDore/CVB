import '../../App.css'
import {useEffect, useContext, useState, Fragment} from 'react'
import { useParams } from "react-router-dom";
import {Context} from '../Reducer.jsx'
import SelectChoice from './SelectChoice.jsx'
import Comment from './Comment.jsx'
import axios from 'axios'
import BASE_URL from '../../config/api.js'
import Login from '../Login.jsx'

/*Ce composant affiche la vidéo séléctionnée par l'utilisateur et éxecute une routine
qui permet à l'utilisateur de choisir un final, puis, il enregistre ce choix en BDD*/

const MetaBox = ()=>{
    const[state,dispatch]= useContext(Context)
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const videoId = useParams()
    const currentVideo = document.getElementById("theatre")
    const [choice, setChoice] = useState()
    const [loop, setLoop] = useState()
    const [vote, setVote] = useState('')
    const [comment, setComment] = useState(false)
    let userId = state.userId
    
    /* Au changement d'une vidéo, dans ce composant ou dans le state,
    l'affichage est mis à jour*/
    
    useEffect(() => {
        reset()
        if(state.videos[0]){state.videos[0].map((item,i) => {
                if(item.id == videoId.id){
                    setUrl(item.url)
                    setTitle(item.title)
                    setDesc(item.description)
                }
                setLoop(true)
            })
        }
    },[videoId, state.videos[0]])
    
    /*Quand la vidéo séléctionnée se termine, une deuxième vidéo est apellée
    et mise en loop. Les boutons permettant de faire le choix s'affichent.*/
    
    const startLoop =(()=>{
        if(loop){
            state.videos[0] && state.videos[0].map((item,i) => {
                if(item.id === state.choice.loop_id){
                    setUrl(item.url)
                    setDesc(state.choice.dilemma)
                }
            })
            currentVideo.setAttribute('loop','true')
            setChoice(true)
        }
    })
    
    const reset = ()=>{
        setDesc('')
        if(loop){ 
            currentVideo.removeAttribute('loop')
            setLoop(false)
        }
        setChoice(false)
    }
    
    /*Une fois que le choix est effectuée, la possibilité de lire est écrire des commentaires
    rélatifs à la vidéo est débloquée. Les informations sur l'utilisateur stockés dans le state
    à la connection, permettent de savoir si l'utilisateur à déjà voté pour cette vidéo.*/
    
    useEffect(()=>{
        (state.choice && state.userChoices) && state.userChoices.map((item,i) => {
                if(item === state.choice.id){
                    setComment(true)
                } else {
                    setComment(false)
                }
            })
    },[state.choice])
    
    /*Les functions suivantes permettent d'enregistrer le choix de l'utilisateur
    dans un state pour le envoyer en BDD et récuperent dans le reducer la vidéo
    correspondante au final séléctionné pour l'afficher*/
    
    const makeChoiceA = ()=>{
        setVote(1)
        state.videos[0].map((item,i) => {
            if(item.id === state.choice.ending_A){
                setUrl(item.url)
            }
        })
    }
    
    const makeChoiceB = ()=>{
        setVote(2)
        state.videos[0].map((item,i) => {
            if(item.id === state.choice.ending_B){
                setUrl(item.url)
            }
        })
    }
    
    const castVote = (vote)=>{
        dispatch({type:'vote',payload: state.choice.id})
        axios.post(`${BASE_URL}/metavote`,{
            choiceId : state.choice.id,
            userId,
            vote
        })
        .then((res)=>{
            res.data && setComment(true)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(() => {
        reset()
        if(vote===1){
            castVote(vote)
        }
        if(vote===2){
            castVote(vote)
        }
    },[vote])
    
    return (
        <Fragment> 
            {/*ce composant permet de récuperer en BDD des autres vidéos potentiellement nécessaires à l'UX*/}
            <SelectChoice movie ={videoId.id} />
            <video id='theatre' src={url} width="480" height="320" preload="auto" autoPlay controlsList="nodownload" controls muted onEnded={startLoop}> Votre navigateur ne prend pas en charge les vidéos HTML5, merci d'utiliser un navigateur plus récent.</video>
            <h1>{title}</h1>
            <h2>{desc}</h2> 
            {/*L'utilisateur qui n'est pas connecté peut regarder la vidéo mais n'aura pas accés au choix tant qu'il reste deconnecté*/}
            <h3>{(choice && state.connected && !comment) && 
                <span>
                    <button onClick={makeChoiceA}>{state.choice.choice_A}</button>
                    <button onClick={makeChoiceB}>{state.choice.choice_B}</button>
                </span>}
            </h3> 
            {/*Le modal du Login permet à l'utilisateur de se connecter (et enregistrer) sans quitter la vue MetaBox*/}
            {(choice && !state.connected) && <div>
                    <h2>Pour pouvoir choisir connecte-toi...</h2>
                    <Login />
                </div>
            }
            {/*Les commentaires s'affichent uniquement si l'utilisateur a effectué l'interaction*/}
            {(state.userChoices && state.choice && comment) && <Comment choice ={state.choice.id} user={userId} userName={state.name}/>}
        </Fragment>
    )
}

export default MetaBox