import { useState, Fragment, useContext, useEffect} from 'react';
import axios from 'axios'
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";
import Choice from './Choice.jsx'

const VideoUpload= (props)=>{
    const [state, dispatch] = useContext(Context)
    const [showForm, setShowForm] = useState(false)
    const videoData = new FormData()
    const [notif, setNotif] = useState('')
    const [entry, setEntry] = useState('')
    const [type, setType] = useState('')
    const [videoCount, setVideoCount] = useState(0)
    const [choiceValue, setChoiceValue] = useState('')
    
    useEffect(() => {
        if(props.metaboxVideo){
            setType('Main_Video')
            setEntry('Main Video')
        } else{
            setType('Other')
            setEntry('Video')
        }
    },[])
    
    useEffect(() => {
        if(videoCount===1){
            setType('Loop_Video')
            setEntry('Loop Video')
        }
        if(videoCount===2){
            setType('Ending_A')
            setEntry('Ending A Video')
        }
        if(videoCount===3){
            dispatch({type:'choiceA', payload: choiceValue })
            setType('Ending_B')
            setEntry('Ending B Video')
        }
    },[videoCount])

    const submit = (e)=>{
        e.preventDefault()
        const newVideo = {...e.target.video.files};
            videoData.append('title', state.newVideo.title)
            videoData.append('type', type)
            videoData.append('video', newVideo[0], newVideo[0].name)
            videoData.append('description', state.newVideo.desc)
            videoData.append('edition', state.newVideo.edition)
            videoData.append('editionId', state.newVideo.editionId)
            
            if(videoCount === 3 ){
                videoData.append('dilemma', state.newVideo.dilemma)
                videoData.append('choice_A', state.newVideo.choice_A)
                videoData.append('choice_B', state.newVideo.choice_B)
            }
            axios.post(`${BASE_URL}/admin`, videoData)
            .then((res)=> {
                console.log(res.data)
                setNotif(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
         
        setVideoCount(videoCount+1)
    }

    const middleState =(e, choice)=>{
        setChoiceValue(e.target.value)
        dispatch({type:choice === "A" ?'choiceA' : 'choiceB', payload: choiceValue })  
    }
    
    return (
        <Fragment>
            {(videoCount === 1 && !props.metaboxVideo) ? <p>{notif}</p> :
            <form onSubmit={submit} encType='multipart/form-data'>
                <label name='upload'>{entry} :
                    <input name='video' type='file' />
                </label>
                {videoCount === 2 && <Choice choice='A' choiceState={choiceValue} setChoice={middleState} />}
                {videoCount === 3 && <Choice choice='B' choiceState={choiceValue} setChoice={middleState} />}
                <input type='submit' name='submit'/>
            </form>}
            
        </Fragment>
        )
}

export default VideoUpload