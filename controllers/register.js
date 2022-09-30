import pool from '../config/database.js'
import bcrypt from 'bcrypt'

const register = (req,res)=>{
    const newUser = `INSERT INTO users ( role_id, nickname, email, password, town, district, registration_date) VALUES (?,?,?,?,?,?,?)`
    const checkNickname = `SELECT nickname FROM users WHERE nickname = ?`
    const checkMail = `SELECT email FROM users WHERE email = ?`
    const saltRounds = 10
     pool.query(checkNickname, [req.body.nickname],(err, user, fields)=>{
         console.log(user)
            if (err) throw err
            if(user[0]){
                let messageName = 'Sorry, the nickname '+req.body.nickname+' is already taken'
                res.json(messageName)
                }else{
                pool.query(checkMail, [req.body.email],(err, address, fields)=>{
                    if (err) throw err
                    if(address[0]){
                        let messageEmail = 'There is already an account with this email'
                        res.json(messageEmail)
                    }else{
                            bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
                                if (err) throw err
                                let params = [2, req.body.nickname, req.body.email, hash, req.body.town, req.body.district, new Date ]
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