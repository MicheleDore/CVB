import { useState, Fragment, useContext} from 'react';
import axios from 'axios'
import BASE_URL from '../config/api.js'
import {Context} from './Reducer.jsx'

const Login= ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[state,dispatch]= useContext(Context)

    const submit = (e)=>{
        e.preventDefault()
        axios.post(`${BASE_URL}/login`,{
            email,
            password,
        })
        .then((res)=>{
            if(res.data.response){
                localStorage.setItem('jwtToken', res.data.token)
                axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
                dispatch({type:'login', payload: res.data})
                console.log(res.data)
            } else {
                console.log('please check your email or password')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    return (
        <Fragment>
            <form onSubmit={submit}>
                <label>Mail:
                    <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='mail' required/>
                </label>
                <label>Password:
                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password'required/>
                </label>
                <input type='submit' value='Login'/>
            </form>
        </Fragment>
        )
}

export default Login