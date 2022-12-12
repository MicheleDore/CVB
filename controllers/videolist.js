import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
const app = express();

/*Ce controlleur demande toutes les informations liées à toutes les vidéo présentes en BDD et les lie aux
éditions correspondantes, il envoye le résultat au composant concerné*/

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const videoList = (req, res)=>{
    let videoRequest = ` SELECT videos.*, editions.year FROM videos JOIN editions ON edition_id =editions.id ORDER BY id DESC`
        pool.query(videoRequest,(err, videos, fields)=>{
            if (err) throw err
            res.json({response:true, videos})
        })
}
    

export default videoList