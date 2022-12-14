import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
const app = express();

/*Ce controlleur demande tous les commentaires présents en BDD liés à la vidéo couramment experimenté par l'utilisateur, les lie aux
auteurs respectifs et les ordonne du plus récent au plus ancien. Il envoye le résultat à l'utilisateur*/

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const metaDebate = (req, res)=>{
    const getComments = ` SELECT comments.content, DATE_FORMAT(publication_time, "%d/%m/%Y     %H:%i:%s") AS publication_time, users.nickname FROM comments JOIN users ON comments.user_id=users.id WHERE choice_id = ? ORDER BY publication_time DESC`
        pool.query(getComments, [req.body.choiceId],(err, comments, fields)=>{
            if (err) throw err
            res.json(comments)
        })
}
    

export default metaDebate