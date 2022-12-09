import {query, asyncQuery, pool} from '../config/database.js'
import bcrypt from 'bcrypt'
import checkLength from '../utilities/lengthchecker.js'

/*Ce controlleur interroge la BDD pour vérifier que l'utilisateur n'est pas enregistré et (en cas contraire) enregistre les nouveaux compte*/

const register = (req,res)=>{
    const newUser = `INSERT INTO users ( role_id, nickname, email, password, town, district, registration_date) VALUES (?,?,?,?,?,?,?)`
    const checkNickname = `SELECT nickname FROM users WHERE nickname = ?`
    const checkMail = `SELECT email FROM users WHERE email = ?`
    const saltRounds = 10
     pool.query(checkNickname, [req.body.nickname],(err, user, fields)=>{
            if (err) throw err
            /*On vérifie que le nickname et l'adresse mail transmis pas l'utilisateur ne sont pas déjà présents en BDD*/
            if(user[0]){
                let messageName = 'Sorry, the nickname '+req.body.nickname+' is already taken'
                res.json(messageName)
                }else{
                pool.query(checkMail, [req.body.email],(err, address, fields)=>{
                    if (err) throw err
                    if(address[0]){
                        let messageEmail = 'There is already an account with this email'
                        res.json(messageEmail)
                        /*On vérifie que la logueur des données transmis n'excède pas celle autorisée*/
                    } else if(!checkLength(req.body, 36)){
                        let messageLength=("Fields maximum length is 36 digits")
                        res.json(messageLength)
                    }
                    else{
                        /*Le mot de passe est cripté*/
                            bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
                                if (err) throw err
                                let params = [2, req.body.nickname, req.body.email, hash, req.body.town, req.body.district, new Date ]
                                /*Quand tout est validé un message est envoyé dans le front et le nouveau utilisateur est enregistré 
                                BDD avec la date courante*/
                                pool.query(newUser, params, (err, user, fields)=>{
                                    if (err) throw err
                                    let message = 'Thank you for joining us ! Your password has been stocked in clear !'
                                    res.json(message)
                                })
                            })
                    }
                })
            }
            
    })
}
export default register