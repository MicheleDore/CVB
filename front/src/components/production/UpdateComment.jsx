import '../../App.css'
import {useState, useEffect, useContext, Fragment} from 'react'
import { Context } from "../Reducer.jsx";
import BASE_URL from '../../config/api.js'
import axios from 'axios'

/*Ce composant affiche les commentaires liés à une vidéo spécifique
et permet à l'utilisateur de commenter à son tour*/

const UpdateComment = (props)=>{
    
    const [newComment, setNewComment]= useState(props.content)
    
    const submitUpdate = (e)=>{
        e.preventDefault()
        console.log(newComment)
        axios.post(`${BASE_URL}/update/${props.commentId}`,{newComment})
            .then((res)=>{
                if(res.data.response){
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    };
    
    return (
        <Fragment>
           <form onSubmit={submitUpdate}>
                <label>
                    <input name='comment' type='textarea' maxLength='566' value={newComment} onChange={(e) => setNewComment(e.target.value)} required/>
                </label>
                <input type='submit' name='submit'/>
            </form>
        </Fragment>
    )
}

export default UpdateComment