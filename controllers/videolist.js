import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import {query, asyncQuery, pool} from '../config/database.js'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const videoList = (req, res)=>{
    let videoRequest = ` SELECT videos.*, editions.year FROM videos JOIN editions ON edition_id =editions.id`
        pool.query(videoRequest,(err, videos, fields)=>{
            if (err) throw err
            res.json({response:true, videos})
        })
}
    

export default videoList