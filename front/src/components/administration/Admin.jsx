import { useState, Fragment, useContext} from 'react';
import BASE_URL from '../../config/api.js'
import { Context } from "../Reducer.jsx";
import ExtractEditions from './ExtractEditions.jsx'
import VideoForm from './VideoForm.jsx'
import VideoUpload from './VideoUpload.jsx'
import VideoUpdate from './VideoUpdate.jsx'

/*Cette vue permet aux administrateurs de charger une vidéo, la mettre à jour 
où de charger une suite de 4 vidéos destinés à la vision dans la MetaBox*/

const Admin= ()=>{
    const [state, dispatch] = useContext(Context)
    const [uploadVideo, setUploadVideo] = useState(true)
    const [uploadBoxVideo, setUploadBoxVideo] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [boxVideo, setBoxVideo] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [oldVideo, setOldVideo] = useState(false)
    
    const toggleButtons = ()=>{
        uploadBoxVideo? setUploadBoxVideo(false) : setUploadBoxVideo(true)
        uploadVideo? setUploadVideo(false) : setUploadVideo(true)
        console.log(' uploadBoxVideo : '+ uploadBoxVideo + ' uploadVideo : '+  uploadVideo)
    }
    
    const metaboxVideoForm = ()=>{
        setBoxVideo(true) 
        setShowForm(true)
        toggleButtons()
    }
    
    const videoForm = ()=>{
        setShowForm(true)
        toggleButtons()
    }
    
    const updateVideo =(selectedVideo)=>{
        setOldVideo(selectedVideo)
        setShowUpdate(true)
        toggleButtons()
    }
    
    return (
        <Fragment>
            <div className="container bigPadding">
                <div className="form smallpadding adminForm">
                    <h1>Vidéos</h1>
                    <ExtractEditions /> {/*ce composant est appellé pour s'assurer que l'administrateur ne rentre pas une année invalide, 
                    les éditions existantes sont chargées dans le reducer*/}
                    {/*Les boutons s'affichent en fonction des interactions de l'admin*/}
                    <div className="betweenFlex smallpadding">
                        {uploadVideo && <button className='smallMargin button specialButton' onClick={videoForm}> Upload Video </button>}
                        {uploadBoxVideo && <button className='smallMargin button specialButton mainColor smallpadding' onClick={metaboxVideoForm}> Upload MetaBox Video </button>}
                    </div>
                    {showForm && <VideoForm metaboxVideo={boxVideo} formState={showForm} toggleForm={setShowForm} />}
                    {state.newVideo && <VideoUpload metaboxVideo={boxVideo} toggleForm={setShowForm}/>}
                    {showUpdate && <VideoUpdate oldVideo={oldVideo} />}
                     {/*Les vidéos déjà présentes en BDD sont affichées et peuvent être mises à jour mais pas supprimées*/}
                    <ul className="generalList">
                    {
                        state.videos[0] && state.videos[0].map((item,i) => {
                          return <li className="betweenFlex smallpadding" key={i} >
                                    <span>
                                      <span> {item.title}</span>
                                      <span> {item.year} </span>
                                      <span> {item.type} </span>
                                     </span>
                                      <span>
                                        <button className='smallMargin button' onClick={(e)=>{updateVideo(item)}}> Update </button>
                                      </span>
                                  </li>
                        })
                    }
                    </ul>
                </div>
            </div>
        </Fragment>
        )
}

export default Admin