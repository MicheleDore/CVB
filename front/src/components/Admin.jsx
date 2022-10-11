import { useState, Fragment, useContext, useEffect} from 'react';
import axios from 'axios'
import CheckLength from './LengthChecker'
import BASE_URL from '../config/api.js'
import { Context } from "./Reducer.jsx";
import ExtractEditions from './ExtractEditions.jsx'

const Admin= ()=>{
    const [notif, setNotif] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const videoData = new FormData()
    const [desc, setDesc] = useState('')
    const [edition, setEdition] = useState('')
    const [editionId, setEditionId] = useState('')
    const [year, setYear] = useState('')
    const [state, dispatch] = useContext(Context)
    let entries = {
                title,
                type,
                desc,
                edition
            }
            
    useEffect(()=>{
        state.videos[0] && state.videos[0].map((item,i) => {
            if(title === item.title & item.type=== 'Main_video') {
                return setYear(item.year)
            }
        })
        !title && setYear('')
    },[title])
    
    const generateYear = () => {
        let currentDate = new Date
        const years = []
        for(let index = 2021; index<= 2025; index++){
            years.push(index)
        }
        return years
    }
    
    useEffect(()=>{
            state.editions && state.editions.map((item,i) => {
                console.log(item.year)
                if(edition == item.year){
                    setEditionId(item.id)
                }
            
            })
        },[edition])
            
    const submit = (e)=>{
        e.preventDefault()
        console.log(editionId)
        const newVideo = {...e.target.video.files};
        let correctLength = CheckLength(entries, 255)
        if(!correctLength){
            setNotif('Fields maximum length is 255 digits')
        } else {
            videoData.append('title', title)
            videoData.append('type', type)
            videoData.append('video', newVideo[0], newVideo[0].name)
            videoData.append('description', desc)
            videoData.append('edition', edition)
            videoData.append('years', generateYear())
            videoData.append('editionId', editionId)
            axios.post(`${BASE_URL}/admin`, videoData)
            .then((res)=> {
                console.log(res)
                setNotif(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    };

    return (
        <Fragment>
            <ExtractEditions />
            <form onSubmit={submit} encType="multipart/form-data">
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
                <label>Type:
                    <select name='type' value={type} onChange={(e) => setType(e.target.value)} required>
                        <option>Main_Video</option>
                        <option>Loop_Video</option>
                        <option>Active_Ending</option>
                        <option>Default_Ending</option>
                        <option>Other</option>
                    </select>
                </label>
                <label name='upload'>Video:
                    <input name='video' type='file' required/>
                </label>
                <p>{notif}</p>
                <label>Description:
                    <input name='desc' value={desc} onChange={(e) => setDesc(e.target.value)} type='text' maxLength='255'/>
                </label>
                <label>Edition:
                    <input name='edition' value={edition} onChange={(e) =>  setEdition(e.target.value)} type='number' list="editions" maxLength='4' />
                    <datalist id='editions'>
                             {year ? <option value={year}/> : generateYear().map((item,i) => {
                                return <option key={i} value={item}/>
                             })}
                    </datalist>
                </label>
                <input type='submit' name='submit'/>
            </form>

        </Fragment>
        )
}

export default Admin