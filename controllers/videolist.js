import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import pool from '../config/database.js'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const videoList = (req, res)=>{
    let loginRequest = ` SELECT * FROM videos`
        pool.query(loginRequest, [req.body.email],(err, videos, fields)=>{
            if (err) throw err
            res.json({response:true, videos})
        })
}
    

export default videoList