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

const login = (req, res)=>{
    let loginRequest = ` SELECT users.*, votes.choice_id FROM users LEFT JOIN votes ON votes.user_id=users.id WHERE email = ?`
        pool.query(loginRequest, req.body.email, (err, user, fields)=>{
            if (err) throw err
             if(user[0]){
                bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                    if (err) throw err
                    if (result){
                        const admin = user[0].role_id === 1
                        let userChoices = []
                        user.map((item,i)=>{ userChoices.push(item.choice_id)})
                        let userData = {
                            name: user[0].nickname, 
                            id: user[0].id, 
                            admin,
                            user: true,
                            userChoices: userChoices
                        }
                        const token = await generateToken(userData)
                        console.log(user[0].nickname+' is connected')
                        res.json({response:true, ...userData, token})
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