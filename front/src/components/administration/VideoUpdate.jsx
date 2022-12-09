   import { useState, Fragment, useContext, useEffect} from 'react';
import axios from 'axios'
import CheckLength from '../LengthChecker'
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";

/*Ce composant est conçu principalement pour permettre le remplacement d'un fichier vidéo qui se trouve 
dans le server. Il est pourtant possible de l'utiliser pour corriger les informations textuelles rélatives.*/

const VideoUpdate= (props)=>{
    const [notif, setNotif] = useState('')
    const [title, setTitle] = useState(props.oldVideo.title)
    const [desc, setDesc] = useState(props.oldVideo.description)
    const [state, dispatch] = useContext(Context)
    const videoData = new FormData()

    let entries = {
        title,
        desc
    }
    /*La longueur des informations rélatives à la vidéo est vérifié par l'élément
    CheckLength pour être conforme à la BDD, si toutes les informations sont 
    la réquete est envoyée*/        
    const submit = (e)=>{
        e.preventDefault()
        let correctLength = CheckLength(entries, 255)
        if(!correctLength){
            setNotif('Fields maximum length is 255 digits')
        } else {
            const newVideo = {...e.target.video.files};
            videoData.append('id', props.oldVideo.id)
            videoData.append('title', title)
            videoData.append('url', props.oldVideo.url)
            videoData.append('description', desc)
            videoData.append('video', newVideo[0])
            console.log(state)
            axios.post(`${BASE_URL}/admin/update`, videoData)
            .then((res)=> {
                console.log(res.data)
                setNotif(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    };

    return (
        <Fragment>
            <form onSubmit={submit}>
                <label>Title:
                    <input name='title' type='text' maxLength='255' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </label>
                <label>Description:
                    <input name='desc' value={desc} onChange={(e) => setDesc(e.target.value)} type='text' maxLength='255'/>
                </label>
                <hr></hr>
                <label name='upload'>NewVideo :
                    <input name='video' type='file' />
                </label>
                <p>{notif}</p>
                <input type='submit' name='submit'/>
            </form>

        </Fragment>
        )
}

export default VideoUpdate