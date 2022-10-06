import { useState} from 'react';
import axios from 'axios'
import React from 'react'
import Logout from './Logout.jsx'
import BASE_URL from '../config/api.js'
import {Context} from './Reducer.jsx'

const Login= ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[state,dispatch]= React.useContext(Context)

    const submit = (e)=>{
        e.preventDefault()
        axios.post(`${BASE_URL}/login`,{
            email,
            password,
        })
        .then((res)=>{
            if(res.data.response){
                dispatch({type:'login', payload: res.data})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    return (
        <React.Fragment>
            <form onSubmit={submit}>
                <label>Mail:
                    <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='mail' required/>
                </label>
                <label>Password:
                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password'required/>
                </label>
                <input type='submit' value='Login'/>
            </form>
        </React.Fragment>
        )
}

export default Login