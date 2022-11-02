import '../../App.css'
import {useState, useEffect, Fragment} from 'react'
import BASE_URL from '../../config/api.js'
import axios from 'axios'

const Comment = (props)=>{
    const [comment, setComment]= useState('')
    const [commentList, setCommentList]= useState([])
    let choiceId = props.choice
    let userId = props.user
    
     useEffect((props) => {
         
        axios.post(`${BASE_URL}/debate`, {choiceId})
            .then((res)=>{
                setCommentList(res.data)
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
                <label>Hi N.{userId}. Please do leave us your thoughts:
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