import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {generateToken} from "../controllers/token.js"
import {pool} from '../config/database.js'
import bcrypt from 'bcrypt'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

/*Ce controlleur interroge la BDD pour récupérer les information liée au compte mail transmis par l'utilisateur...*/

const login = (req, res)=>{
    let loginRequest = ` SELECT users.*, votes.choice_id FROM users LEFT JOIN votes ON votes.user_id=users.id WHERE email = ?`
        pool.query(loginRequest, req.body.email, (err, user, fields)=>{
            if (err) throw err
             if(user[0]){
                 //...il compare le mot de passe transmis avec celui présent en BDD...
                bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                    if (err) throw err
                    if (result){
                        //...il vérifie s'il s'agit d'un administrateur
                        const admin = user[0].role_id === 1
                        /*il stocke les interactions effectuées dans le passée par l'utilisateur dans un tableau pour
                        l'autoriser à accéder aux relatifs commentaires*/
                        let userChoices = []
                        user.map((item,i)=>{ userChoices.push(item.choice_id)})
                        let userData = {
                            name: user[0].nickname, 
                            id: user[0].id, 
                            admin,
                            user: true,
                            userChoices: userChoices
                        }
                        /*Si les informations reçues sont correctes il renvoye les informations nécessaires... */
                        const token = await generateToken(userData)
                        console.log(user[0].nickname+' is connected')
                        res.json({response:true, ...userData, token})
                        /*... il notifie le cas échant*/
                    } else {
                        res.json({response:false}) 
                        console.log('error : wrong pw')
                    }
                })
            } else {
                res.json({response:false})
                console.log('error : wrong email')
            }
        })
}

export default login