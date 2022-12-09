import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
const app = express();

/*Ce controlleur permet de retourver en BDD l'ensemble des informations liéés à la vidéo
selectionnée par l'utilisateur*/

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const metaBox = (req, res)=>{
    let selectChoice = ` SELECT * FROM choices WHERE movie_id= ?`
        let movieId = parseInt(req.params.movie)
        pool.query(selectChoice, [movieId],(err, choice, fields)=>{
            if (err) throw err
            res.json({response:true, choice})
        })
}
    

export default metaBox