import { useState, Fragment} from 'react';
import axios from 'axios'
import CheckLength from './LengthChecker'
import CheckForbiddenChar from './CheckForbiddenChar'
import BASE_URL from '../config/api.js'

const Register= ()=>{
    const [notif, setNotif] = useState('')
    let strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [town, setTown] = useState('')
    const [district, setDistrict] = useState('')
    let entries = {
                nickname,
                email,
                password,
                town,
                district
            }
            
    /*Cette fonction verifie la validité du mot de passe et utilise les composants CheckLength
    et CheckForbiddenChar pour vérifier que le données ont les bon nombre de charactére et ne 
    contiennent pas d'espaces...*/
        
    const submit = (e)=>{
        e.preventDefault()
        let correctLength = CheckLength(entries, 36)
        /*... en cas contraire il notifie l'utilisateur sans faire aucune requete en BDD*/
        if(!password.match(strongPassword)){
            setNotif('Your password should have at least 8 digits and include at least one special character, one number and one uppercase.')
        }else if(!CheckForbiddenChar(password)){
            setNotif('Your password cannot include empty spaces')
        } else if(!correctLength){
            setNotif('Fields maximum length is 36 digits')
        }  
        else{
            axios.post(`${BASE_URL}/register`,entries)
            .then((res)=>{
                setNotif(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    };
    return (
        <Fragment>
            <form onSubmit={submit}>
                <label>Pseudo:
                    <input name='nickname' type='text' maxLength='36' value={nickname} onChange={(e) => setNickname(e.target.value)} required/>
                </label>
                <label>Mail:
                    <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email'  required/>
                </label>
                <label>Password:
                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' maxLength='36' required/>
                </label>
                <p>{notif}</p>
                <label>Ville:
                    <input name='town' value={town} onChange={(e) => setTown(e.target.value)} type='text' maxLength='36'/>
                </label>
                <label>Quartier:
                    <input name='district' value={district} onChange={(e) => setDistrict(e.target.value)} type='text' maxLength='36' />
                </label>
                <input type='submit' name='submit'/>
            </form>
        </Fragment>
        )
}

export default Register