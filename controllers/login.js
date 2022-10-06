import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import pool from '../config/database.js'
import bcrypt from 'bcrypt'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const login = (req, res)=>{
    let loginRequest = ` SELECT * FROM users WHERE email = ?`
        pool.query(loginRequest, [req.body.email],(err, user, fields)=>{
            if (err) throw err
             if(user[0]){
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) throw err
                    if (result){
                        // req.session.user = user[0].nickname
                        const admin = user[0].role_id === 1
                        // req.session.admin = admin
                        res.json({response:true, name: user[0].nickname, admin})
                        console.log(user[0].nickname+' is connected')
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