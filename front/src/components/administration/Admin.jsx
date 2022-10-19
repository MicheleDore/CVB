import { useState, Fragment, useContext} from 'react';
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";
import ExtractEditions from './ExtractEditions.jsx'
import VideoForm from './VideoForm.jsx'
import VideoUpload from './VideoUpload.jsx'

const Admin= ()=>{
    const [state, dispatch] = useContext(Context)
    const [uploadButton, setUploadButton] = useState(true)
    const [uploadMainButton, setUploadMainButton] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [boxVideo, setBoxVideo] = useState(false)
    
    const mainButton = ()=>{
        setBoxVideo(true)
        console.log(boxVideo)
        setUploadMainButton(false)
        setUploadButton(false)
        setShowForm(true)
    }
    
    const button = ()=>{
        setUploadMainButton(false)
        setUploadButton(false)
        setShowForm(true)
    }
    // const [notif, setNotif] = useState('')
    // const [title, setTitle] = useState('')
    // const [type, setType] = useState('')
    // const [desc, setDesc] = useState('')
    // const [edition, setEdition] = useState('')
    // const [editionId, setEditionId] = useState('')
    // const [choiceA, setChoiceA] = useState('')
    // const [choiceB, setChoiceB] = useState('')
    // const videoData = new FormData()
    // const [mainVODTitle, setMainVODTitle] = useState([])
    // 
    
    // let entries = {
    //     title,
    //     type,
    //     desc,
    //     edition
    // }
    
    // useEffect(() => {
    //     const nameOfVOD = []
    //     state.videos[0] && state.videos[0].map((item,i) => {
    //         item.type === 'Main_video' && nameOfVOD.push(item.title)
    //     })
    //     setMainVODTitle(nameOfVOD)
    // },[])
            
    // useEffect(()=>{
    //     if(mainVODTitle.includes(title)){
    //         state.videos[0] && state.videos[0].map((item,i) => {
    //             if(title === item.title && item.type=== 'Main_video') {
    //               setEdition(item.year)
    //             }
    //         })
    //     } else {
    //         setEdition('')
    //     }
    // },[title])
    
    // const generateYear = () => {
    //     let currentDate = new Date
    //     const years = []
    //     for(let index = 2021; index<= currentDate.getFullYear(); index++){
    //         years.push(index)
    //     }
    //     return years
    // }
    
    // useEffect(()=>{
    //     if(state.editions){
    //         if(state.editions[0].includes(parseInt(edition))){
    //             state.editions[1].map((item,i) => {
    //                 if(edition == item.year){
    //                     setEditionId(item.id)
    //                 }
    //             })
    //         }else{
    //             setEditionId('')
    //         }
            
    //     }
    // },[edition])
            
    // const submit = (e)=>{
    //     e.preventDefault()
    //     const newVideo = {...e.target.video.files};
    //     let correctLength = CheckLength(entries, 255)
    //     if(!correctLength){
    //         setNotif('Fields maximum length is 255 digits')
    //     } else {
    //         videoData.append('title', title)
    //         videoData.append('type', type)
    //         videoData.append('video', newVideo[0], newVideo[0].name)
    //         videoData.append('description', desc)
    //         videoData.append('edition', edition)
    //         videoData.append('years', generateYear())
    //         videoData.append('editionId', editionId)
    //         videoData.append('choiceA', choiceA)
    //         videoData.append('choiceB', choiceB)
    //         axios.post(`${BASE_URL}/admin`, videoData)
    //         .then((res)=> {
    //             setNotif(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }
    // };

    return (
        <Fragment>
            <ExtractEditions />
            <ul>
            {
            state.videos[0] && state.videos[0].map((item,i) => {
                  return <li key={i} ><span> {item.title}</span><span> {item.year} </span><span> {item.type} </span></li>
                })
            }
          </ul>
            {uploadButton && <button onClick={button}> Upload Video </button>}
            {uploadMainButton && <button onClick={mainButton}> Upload MetaBox Video </button>}
            {showForm && <VideoForm metaboxVideo={boxVideo} formState={showForm} toggleForm={setShowForm} />}
            {state.newVideo && <VideoUpload metaboxVideo={boxVideo} />}
        </Fragment>
        )
}

export default Admin