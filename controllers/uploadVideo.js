import formidable from 'formidable';
import fs from 'fs';
import pool from '../config/database.js'
const accepted = ['mp4', 'avi', 'mov', 'avchd']
const checkAcceptedExtensions = (file) => {
	const type = file.mimetype.split('/').pop()
	
	if (accepted.includes(type)) {
	    return true
	}
	return false
}

const addChoice = (fields) => {
    const videoLot = `SELECT id FROM videos WHERE title= ?`
    const newChoice = `INSERT INTO interactions (movie_id, loop_id, ending_A, ending_B, dilemma, choice_A, choice_B) VALUES (?,?,?,?,?,?,?)`
    let params = [fields.dilemma, fields.choice_A, fields.choice_B]
    console.log(params)
    pool.query(videoLot, fields.title,(err, videoIds, fields)=>{
        if (err) throw err
        params.unshift(videoIds[0].id,videoIds[1].id,videoIds[2].id,videoIds[3].id)
        pool.query(newChoice, params, (err, video, fields)=>{
            if (err) throw err
        })
     return
    })
}

const addVideo = (params, upload, newFilename, other) => {
    const newVideo = `INSERT INTO videos (title, type, url, description, edition_id) VALUES (?,?,?,?,?)`
    let oldPath = upload.video.filepath
    let newPath = `public/videos/${newFilename}`
    console.log(other)
    pool.query(newVideo, params, (err, video, fields)=>{
        if (err) throw err
        fs.copyFile(oldPath, newPath, (err) => {
            if (err) throw err
        })
        other.choice_B && addChoice(other)
    })
    
     return
}

const uploadVideo = (req, res) => {
   
    const form = formidable({keepExtensions: true});
    const newEdition = `INSERT INTO editions (year) VALUES (?)`
    form.parse(req, (err, fields, upload) => {
        if (err) throw err
        // let yearOptions = fields.years.split(',')
        let newFilename = upload.video.newFilename
        let newUrl  = `http://micheledore.sites.3wa.io:9300/videos/${newFilename}`
        let message
        if(upload.originalFilename !== ''){
            if(checkAcceptedExtensions(upload.video)){
                  //  if(yearOptions.includes(fields.edition))
                        const message = 'Video uploaded succesfully !'
                        let params = [fields.title, fields.type, newUrl, fields.description]
                        if(!fields.editionId) { 
                            pool.query(newEdition, fields.edition, (err, edition, fields)=>{
                                if (err) throw err
                                params.push(edition.insertId)
                                addVideo(params, upload, newFilename, fields)
                            })
                        } else {
                            params.push(fields.editionId)
                            addVideo(params, upload, newFilename, fields)
                        }
                        res.json(message)
                        
            } else {
                message = 'Your video must have one of the following extensions : '+accepted
                res.json(message)
            }
        }
    })
}


export default uploadVideo