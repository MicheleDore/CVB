import { useState, Fragment, useContext} from 'react';
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";
import ExtractEditions from './ExtractEditions.jsx'
import VideoForm from './VideoForm.jsx'
import VideoUpload from './VideoUpload.jsx'
import VideoUpdate from './VideoUpdate.jsx'

const Admin= ()=>{
    const [state, dispatch] = useContext(Context)
    const [uploadVideo, setUploadVideo] = useState(true)
    const [uploadBoxVideo, setUploadBoxVideo] = useState(true)
    const [videoList, setVideoList] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [boxVideo, setBoxVideo] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [oldVideo, setOldVideo] = useState(false)
    
    const hideButtons = ()=>{
        setUploadBoxVideo(false)
        setUploadVideo(false)
        setVideoList(false)
    }
    
    const metaboxVideoForm = ()=>{
        setBoxVideo(true) 
        setShowForm(true)
        hideButtons()
    }
    
    const videoForm = ()=>{
        setShowForm(true)
        hideButtons()
    }
    
    const updateVideo =(selectedVideo)=>{
        setOldVideo(selectedVideo)
        setShowUpdate(true)
        hideButtons()
    }
    
    return (
        <Fragment>
            <ExtractEditions />
            <ul>
            {
            (state.videos[0] && videoList) && state.videos[0].map((item,i) => {
                  return <li key={i} >
                              <span> {item.title}</span>
                              <span> {item.year} </span>
                              <span> {item.type} </span>
                              <span>
                                <button onClick={(e)=>{updateVideo(item)}}> Update Video </button>
                              </span>
                          </li>
                })
            }
          </ul>
            {uploadVideo && <button onClick={videoForm}> Upload Video </button>}
            {uploadBoxVideo && <button onClick={metaboxVideoForm}> Upload MetaBox Video </button>}
            {showForm && <VideoForm metaboxVideo={boxVideo} formState={showForm} toggleForm={setShowForm} />}
            {state.newVideo && <VideoUpload metaboxVideo={boxVideo} />}
            {showUpdate && <VideoUpdate oldVideo={oldVideo} />}
        </Fragment>
        )
}

export default Admin