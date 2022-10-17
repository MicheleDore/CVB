   import { useState, Fragment, useContext, useEffect} from 'react';
import axios from 'axios'
import CheckLength from '../LengthChecker'
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";

const VideoForm= ()=>{
    const [notif, setNotif] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [dilemma, setDilemma] = useState('')
    const [state, dispatch] = useContext(Context)
    const [edition, setEdition] = useState('')
    const [editionId, setEditionId] = useState('')
    const [mainVODTitle, setMainVODTitle] = useState([])
    
    useEffect(() => {
        const nameOfVOD = []
        state.videos[0] && state.videos[0].map((item,i) => {
            item.type === 'Main_video' && nameOfVOD.push(item.title)
        })
        setMainVODTitle(nameOfVOD)
    },[])
            
    useEffect(()=>{
        if(mainVODTitle.includes(title)){
            state.videos[0] && state.videos[0].map((item,i) => {
                if(title === item.title && item.type=== 'Main_video') {
                  setEdition(item.year)
                }
            })
        } else {
            setEdition('')
        }
    },[title])
    
    const generateYear = () => {
        let currentDate = new Date
        const years = []
        for(let index = 2021; index<= currentDate.getFullYear(); index++){
            years.push(index)
        }
        return years
    }
    
     
    let entries = {
        title,
        edition,
        dilemma,
        desc,
        years: generateYear(),
    }
    
    useEffect(()=>{
        if(state.editions){
            if(state.editions[0].includes(parseInt(edition))){
                state.editions[1].map((item,i) => {
                    if(edition == item.year){
                        setEditionId(item.id)
                    }
                })
            }else{
                setEditionId('')
            }
            
        }
    },[edition])
            
    const submit = (e)=>{
        e.preventDefault()
        let correctLength = CheckLength(entries, 255)
        if(!correctLength){
            setNotif('Fields maximum length is 255 digits')
        } else if (generateYear().includes(edition)){
            dispatch({type:'newVideo', payload: entries})
        } else {
            setNotif('Please select a suitable edition')
        }
    };

    return (
        <Fragment>
            <form onSubmit={submit}>
                <label>Title:
                    <input name='title' type='text' maxLength='255' value={title} onChange={(e) => setTitle(e.target.value)} list="titles" required/>
                        <datalist id='titles'>
                             {state.videos[0] && state.videos[0].map((item,i) => {
                                    if(item.type=== 'Main_video'){
                                        return <option key={i} value={item.title}/>
                                    }
                                })
                             }
                        </datalist>
                </label>
                <label>Edition:
                    <select name='edition' value={edition} onChange={(e) =>  setEdition(e.target.value)} list="editions" maxLength='4' >
                             <option></option>
                             {edition ? <option >{edition}</option> : generateYear().map((item,i) => {
                                return <option key={i}>{item}</option>
                             })}
                    </select>
                </label>
                <label>Dilemma:
                    <input name='dilemma' value={dilemma} onChange={(e) => setDilemma(e.target.value)} type='text' maxLength='255'/>
                </label>
                <label>Description:
                    <input name='desc' value={desc} onChange={(e) => setDesc(e.target.value)} type='text' maxLength='255'/>
                </label>
                <hr></hr>
                <p>{notif}</p>
                <input type='submit' name='submit'/>
            </form>

        </Fragment>
        )
}

export default VideoForm