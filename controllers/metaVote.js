import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const metaVote = (req, res)=>{
    const checkUser = ` SELECT id FROM votes WHERE user_id= ? AND choice_id = ?`
        pool.query(checkUser, [req.body.userId, req.body.choiceId],(err, user, fields)=>{
            if (err) throw err
            if(!user[0]){
                const castVote = ` INSERT INTO votes (choice_id, user_id, choice_value, vote_time) VALUES(?, ?, ?, ?)`
                let params = [req.body.choiceId, req.body.userId, req.body.vote, new Date]
                 pool.query(castVote, params, (err, vote, fields)=>{
                    if (err) throw err
                    res.json({response: true, message: 'Thank you for performing your civic duty'})
                 })
                
            } else {
                    res.json('One movie one vote')
                        
            }
        })
}
    

export default metaVote