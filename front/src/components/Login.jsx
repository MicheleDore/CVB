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
    const [warning, setWarning] = useState('')
    
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
                console.log(res.data)
                localStorage.setItem('jwtToken', res.data.token)
                axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
                dispatch({type:'login', payload: res.data})
                setNotif('Welcome '+res.data.name+' !')
                setWarning('')
            } else {
                /*si l'utilisateur n'est pas présent en BDD ou le mot de pass est mauvais,
                l'utilisateur reçoit un message*/
                setWarning('Please check your email or password')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    
        const showRegister = ()=>{
        !register ? setRegister(true) : setRegister(false)
    }
    
    return (
        <Fragment>
            {/*Ce composant est un modale qui permet à l'uilisateur de se connecter sans sortir de sa navigation*/}
            <Modal show={register} onHide={showRegister}>
                <Modal.Header >
                  <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body className=' form'>
                    <Register />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={()=>{showRegister()}}>Close</button>
                </Modal.Footer>
              </Modal>
              <p>{notif}</p>
                <Fragment>
                <div className='container relative bigPadding form'>
                    <h1>{notif}</h1>
                    {!state.connected && <div>
                                            <form className='aroundFlex column bigPadding' onSubmit={submit}>
                                                    <p>{warning}</p>
                                                    <label htmlFor='email'>Mail:</label>
                                                    <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='mail' required/>
                                                    <label htmlFor='password'>Password:</label>
                                                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password'required/>
                                                    <input className='smallMargin' type='submit' value='Login' />
                                            </form>
                                            <p>Not registered ? </p> 
                                            <button onClick={()=>{showRegister()}}>Click here</button>
                                        </div>
                    }
                </div>
                </Fragment>
                }
            }
        </Fragment>
        )
}

export default Login