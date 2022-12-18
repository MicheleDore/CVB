import '../../App.css'
import {useState, useEffect, useContext, Fragment} from 'react'
import { Context } from "../Reducer.jsx";
import BASE_URL from '../../config/api.js'
import axios from 'axios'

/*Ce composant affiche les commentaires liés à une vidéo spécifique
et permet à l'utilisateur de commenter à son tour*/

const Comment = (props)=>{
    const [state, dispatch] = useContext(Context)
    const [comment, setComment]= useState('')
    const [commentList, setCommentList]= useState([])
    const [commentToUpdate, setCommentToUpdate]=useState('')
    const [newComment, setNewComment]= useState('')
    const [refresh, setRefresh]= useState(true)
    
    let choiceId = props.choice
    let userId = props.user
    
     useEffect((props) => {
        axios.get(`${BASE_URL}/debate/${choiceId}`)
            .then((res)=>{
                res.data && setCommentList(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[comment, commentToUpdate, refresh]);
    
    const uploadComment = (e)=>{
        e.preventDefault()
        axios.post(`${BASE_URL}/comment`,{
            comment,
            choiceId,
            userId
        })
        .then((res)=>{
            if(res.data.response){
                setRefresh(!refresh)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const deleteComment = (commentId)=>{
        axios.post(`${BASE_URL}/delete/${commentId}`)
            .then((res)=>{
                if(res.data.response){
                    setCommentList([...commentList])
                    setRefresh(!refresh)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    };
    
    const showUpdateComment=(commentId, comment)=>{
        setCommentToUpdate(commentId)
        setNewComment(comment)
    }
    
    const updateComment = (e)=>{
        console.log(newComment)
        e.preventDefault()
        axios.post(`${BASE_URL}/update/${commentToUpdate}`, {newComment})
            .then((res)=>{
                if(res.data.response){
                    setCommentToUpdate(false)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    };
    
    return (
        <Fragment>
            <form onSubmit={uploadComment}>
            <h6>Hi {props.userName}. Please do leave us your thoughts:</h6>
                <div className="aroundFlex column adminForm">
                    <label className=" maxWidth">
                        <textarea className="textArea maxWidth" name='comment' type='textarea' maxLength='566' value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                    </label>
                    <input type='submit' name='submit'/>
                </div>
            </form>
            <ul className="generalList aroundFlex column commentList">
                {commentList.map((item, i)=>{
                    return <li key={i} className="maxWidth smallpadding">
                                <div className="comment">
                                    <div className='betweenFlex mainColor smallpadding commentHeader'>
                                        <p> {item.nickname} </p>
                                        <p> {item.publication_time} </p>
                                    </div>
                                    <div className='commentBody'>
                                        {item.id===commentToUpdate ? <form className="aroundFlex column" onSubmit={updateComment}>
                                                                        <label className=" maxWidth ">
                                                                            <textarea name='comment' className="textArea maxWidth" type='textarea' maxLength='566' value={newComment} onChange={(e) => setNewComment(e.target.value)} required></textarea>
                                                                        </label>
                                                                        <input className='smallMargin button' type='submit' name='submit'/>
                                                                    </form> : <p className='textAlignStart smallpadding'>{item.content}</p> 
                                        }
                                    </div>
                                    <div className='aroundFlex smallpadding mainColor commentFooter '>
                                         {((state.admin || props.userName===item.nickname) && !commentToUpdate) && <button onClick={(e)=>{deleteComment(item.id)}}> Delete Comment </button>}
                                         {(props.userName===item.nickname && !commentToUpdate) && <button onClick={(e)=>{showUpdateComment(item.id, item.content)}}> Update Comment </button>}
                                    </div>
                                </div>
                            </li>
                })}
            </ul>
        </Fragment>
    )
}

export default Comment