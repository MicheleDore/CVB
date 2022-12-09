import '../../App.css'
import {useState, useEffect, Fragment} from 'react'
import BASE_URL from '../../config/api.js'
import axios from 'axios'

/*Ce composant affiche les commentaires liés à une vidéo spécifique
et permet à l'utilisateur de commenter à son tour*/

const Comment = (props)=>{
    const [comment, setComment]= useState('')
    const [commentList, setCommentList]= useState([])
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
    }, [comment, choiceId]);
    
    const submit = (e)=>{
        e.preventDefault()
        axios.post(`${BASE_URL}/comment`,{
            comment,
            choiceId,
            userId
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.response){
                setComment('')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    return (
        <Fragment>
            <form onSubmit={submit}>
                <label>Hi {props.userName}. Please do leave us your thoughts:
                    <input name='comment' type='textarea' maxLength='566' value={comment} onChange={(e) => setComment(e.target.value)} required/>
                </label>
                <input type='submit' name='submit'/>
            </form>
            <ul>
                {commentList.map((item, i)=>{
                    return <li key={i} >
                                <span>
                                    <p> {item.nickname} </p>
                                    <p> {item.publication_time} </p>
                                </span>
                                <div>
                                    <p>{item.content}</p>
                                </div>
                            </li>
                })}
            </ul>
        </Fragment>
    )
}

export default Comment