import formidable from 'formidable';
import fs from 'fs';
import {query, asyncQuery, pool} from '../config/database.js'
import checkExtensions from './checkExtensions.js'
const extensions = ['mp4', 'avi', 'mov', 'avchd']
let message

const toDatabase =(url, fields, upload,newFilename, res, oldFile )=>{
    const newVideo = `UPDATE videos SET title=?, url=?, description=? WHERE id=?`
    let params = [fields.title, url, fields.description, fields.id]
    
        pool.query(newVideo, params, (err, video, fields)=>{
            if (err) throw err
                if(upload.video){
                if(checkExtensions(upload.video, extensions)){
                    let oldPath = oldFile.replace(`http://micheledore.sites.3wa.io:9300`, 'public')
                        let tempPath = upload.video.filepath
                        let newPath = `public/videos/${newFilename}`
                        fs.copyFile(tempPath, newPath, (err) => {
                            if (err) throw err
                            message = 'Video updated successfully!'
                            fs.unlink(oldPath, (err)=>{
                                if (err) throw err
                            })
                            res.json(message)
                        })
                    } else {
                        message = 'Your video must have one of the following extensions: '+extensions
                        res.json(message)
                }
            } else {
                    res.json('Video updated successfully!')
                }
        })
}

const updateVideo = (req, res) => {
    const form = formidable({keepExtensions: true});
    form.parse(req, (err, fields, upload) => {
        if (err) throw err
        let newFilename
        if(upload.video){
            newFilename = upload.video.newFilename
            let oldFile = fields.url
            let url  = `http://micheledore.sites.3wa.io:9300/videos/${newFilename}`
            toDatabase(url, fields, upload, newFilename, res, oldFile)
        } else {
            let url = fields.url
            toDatabase(url, fields, upload, newFilename, res) 
        }
        
    })
}


export default updateVideo