import { useState} from 'react';
import axios from 'axios'
import React from 'react'
import BASE_URL from '../config/api.js'

const Register= ()=>{
    const [notif, setNotif] = useState('')
    let strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [town, setTown] = useState('')
    const [district, setDistrict] = useState('')
    const submit = (e)=>{
        e.preventDefault()
        if(!password.match(strongPassword)){
            setNotif('Your password should have at least 8 digits and include at least one special character, one number and one uppercase.')
        }else{
            axios.post(`${BASE_URL}/register`,{
                nickname,
                email,
                password,
                town,
                district
            })
            .then((res)=>{
                console.log(res.data)
                setNotif(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    };
    return (
        <React.Fragment>
            <form onSubmit={submit}>
                <label>Pseudo:
                    <input name='nickname' type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} required/>
                </label>
                <label>Mail:
                    <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email'required/>
                </label>
                <label>Password:
                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password'required/>
                </label>
                <p>{notif}</p>
                <label>Ville:
                    <input name='town' value={town} onChange={(e) => setTown(e.target.value)} type='text'/>
                </label>
                <label>Quartier:
                    <input name='district' value={district} onChange={(e) => setDistrict(e.target.value)} type='text'/>
                </label>
                <input type='submit' name='submit'/>
            </form>

        </React.Fragment>
        )
}

export default Register