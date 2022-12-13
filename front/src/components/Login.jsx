import { useState, Fragment, useContext} from 'react';
import axios from 'axios'
import BASE_URL from '../config/api.js'
import {Context} from './Reducer.jsx'
import {Modal} from 'react-bootstrap'
import Register from './Register.jsx'

const Login= ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [state,dispatch]= useContext(Context)
    const [register, setRegister] = useState(false)
        const [notif, setNotif] = useState('')
    
    /* Cette function passe dans le reduceur les informations liées à l'utilisateur
    provénantes de la BDD et génère le token nécessaire pour la persistance de sa session*/
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
                setNotif('Welcome '+state.name+' !')
            } else {
                /*si l'utilisateur n'est pas présent en BDD ou le mot de pass est mauvais,
                l'utilisateur reçoit un message*/
                setNotif('please check your email or password')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    
        const showRegister = ()=>{
        !register && setRegister(true)
        register && setRegister(false)
    }
    
    return (
        <Fragment>
            {/*Ce composant est un modale qui permet à l'uilisateur de se connecter sans sortir de sa navigation*/}
            <Modal className='container' show={register} onHide={showRegister}>
                <Modal.Header >
                  <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Register/>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={()=>{showRegister()}}>Close</button>
                </Modal.Footer>
              </Modal>
              <p>{notif}</p>
                {!register && <Fragment>
                    <form onSubmit={submit}>
                        <label>Mail:
                            <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='mail' required/>
                        </label>
                        <label>Password:
                            <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password'required/>
                        </label>
                        <input type='submit' value='Login'/>
                    </form>
                    <p>Not registered ? </p> 
                    <button onClick={()=>{showRegister()}}>Click here</button>
                </Fragment>
            }
        </Fragment>
        )
}

export default Login