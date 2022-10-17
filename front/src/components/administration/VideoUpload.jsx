import { useState, Fragment, useContext, useEffect} from 'react';
import axios from 'axios'
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";
import Choice from './Choice.jsx'

const VideoUpload= ()=>{
    const [state, dispatch] = useContext(Context)
    const [showForm, setShowForm] = useState(false)
    const videoData = new FormData()
    const [notif, setNotif] = useState('')
    const [entry, setEntry] = useState('Main Video')
    const [type, setType] = useState('Main_Video')
    const [videoCount, setVideoCount] = useState(0)
    const [choiceValue, setChoiceValue] = useState('')
    
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
        if(videoCount===4){
            dispatch({type:'choiceB', payload: choiceValue })
            axios.post(`${BASE_URL}/admin`, state.newVideo)
            .then((res)=> {
                console.log(res.data)
                setNotif(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },[videoCount])

    const submit = (e)=>{
        e.preventDefault()
        setVideoCount(videoCount+1)
        console.log(state.newVideo)
        const newVideo = {...e.target.video.files};
        videoData.append('title', state.newVideo.title)
        videoData.append('type', type)
        videoData.append('video', newVideo[0], newVideo[0].name)
        videoData.append('description', state.newVideo.desc)
        videoData.append('edition', state.newVideo.edition)
        axios.post(`${BASE_URL}/admin`, videoData)
        .then((res)=> {
            console.log(res.data)
            setNotif(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const middleState =(e)=>{
        setChoiceValue(e.target.value)
    }
    
    return (
        <Fragment>
            <form onSubmit={submit} encType='multipart/form-data'>
                <label name='upload'>{entry} :
                    <input name='video' type='file' />
                </label>
                {videoCount === 2 && <Choice choice='A' choiceState={choiceValue} setChoice={middleState} />}
                {videoCount === 3 && <Choice choice='B' />}
                <input type='submit' name='submit'/>
            </form>
        </Fragment>
        )
}

export default VideoUpload