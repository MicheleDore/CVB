import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const metaDebate = (req, res)=>{
    const getComments = ` SELECT comments.content, DATE_FORMAT(publication_time, "%d/%m/%Y     %H:%i:%s") AS publication_time, users.nickname FROM comments JOIN users ON comments.user_id=users.id WHERE choice_id = ? ORDER BY publication_time`
        pool.query(getComments, [req.body.choiceId],(err, comments, fields)=>{
            if (err) throw err
            res.json(comments)
        })
}
    

export default metaDebate