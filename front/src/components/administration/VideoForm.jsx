   import { useState, Fragment, useContext, useEffect} from 'react';
import axios from 'axios'
import CheckLength from '../LengthChecker'
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";

/*Ce composant permet à l'utilisateur de charger les informations textuelles relative à une vidéo*/

const VideoForm= (props)=>{
    const [notif, setNotif] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [dilemma, setDilemma] = useState('')
    const [state, dispatch] = useContext(Context)
    const [edition, setEdition] = useState('')
    const [editionId, setEditionId] = useState('')
    let entries = {
        title,
        edition,
        dilemma,
        desc,
        editionId
    }

/*Les editions disponibles sont suggerée à l'administrateur,
stocké dans le reducer par le composant ExtractEditions*/

    useEffect(()=>{
        console.log(editionId)
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
            
/*La longueur des informations rélatives à la vidéo est vérifié par l'élément
CheckLength pour être conforme à la BDD, si toutes les informations sont 
validée elles sont stocké dans le réduceur*/
    const submit = (e)=>{
        e.preventDefault()
        let correctLength = CheckLength(entries, 255)
        if(!correctLength){
            setNotif('Fields maximum length is 255 digits')
        } else if (state.editions[2].includes(parseInt(edition))){
            props.toggleForm(false)
            console.log(entries)
            dispatch({type:'newVideo', payload: entries})
            console.log(state)
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
                             {edition ? <option >{edition}</option> : state.editions[2].map((item,i) => {
                                return <option key={i}>{item}</option>
                             })}
                    </select>
                </label>
                {props.metaboxVideo && 
                <label>Dilemma:
                    <input name='dilemma' value={dilemma} onChange={(e) => setDilemma(e.target.value)} type='text' maxLength='255'/>
                </label>}
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