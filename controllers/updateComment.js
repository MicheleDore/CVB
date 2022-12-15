import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
import checkLength from '../utilities/lengthchecker.js'
const app = express();

/*Ce controller permet de remplacer un commentaire, dont l'id est transmis par
l'administrateur, et envoyer le nouveau texte en BDD */

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const updateComment = (req, res)=>{
        const commentUpdate = ` UPDATE comments SET content = ? WHERE comments.id = ? `
        let commentId = parseInt(req.params.comment)
        let params = [req.body.newComment, commentId]
        //le fichier checkLength vérifie que le message n'est pas trop long...
        if(checkLength(req.body, 566)){
             pool.query(commentUpdate, params, (err, newComment, fields)=>{
                if (err) throw err
                res.json({response:true})
             })
             //...le cas écheant, l'utilisateur est notifié
         } else {
             res.json('You can split your contribution into multiple comments ;)')
         }
             
}
    

export default updateComment