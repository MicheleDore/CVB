import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
const app = express();

/*Ce controller permet à l'administrateur d'effacer un commentaire présent en BDD*/

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const metaComment = (req, res)=>{
        const deleteComment = ` DELETE FROM comments WHERE comments.id = ? `
        let commentId = parseInt(req.params.comment)
        pool.query(deleteComment, [commentId], (err, comment, fields)=>{
        if (err) throw err
                res.json({response:true})
        })
}
    

export default metaComment