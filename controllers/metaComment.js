import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
import checkLength from '../utilities/lengthchecker.js'
const app = express();

/*Ce controller permet l'insertion en BDD du commentaire envoyé par l'utilisateur*/

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const metaComment = (req, res)=>{
        const leaveComment = ` INSERT INTO comments (choice_id, user_id, content, publication_time) VALUES(?, ?, ?, ?)`
        let params = [req.body.choiceId, req.body.userId, req.body.comment, new Date]
        //le fichier checkLength vérifie que le message n'est pas trop long...
        if(checkLength(req.body, 566)){
             pool.query(leaveComment, params, (err, vote, fields)=>{
                if (err) throw err
                res.json({response:true})
             })
             //...le cas écheant, l'utilisateur est notifié
         } else {
             res.json('You can split your contribution into multiple comments ;)')
         }
}
    

export default metaComment