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

const addChoice = (fields, upload) => {
    const videoLot = `SELECT id FROM videos WHERE title= ?`
    const newChoice = `INSERT INTO interactions (movie_id, loop_id, ending_A, ending_B, dilemma, choice_A, choice_B) VALUES (?,?,?,?,?,?,?)`
    let params = [fields.dilemma, fields.choice_A, fields.choice_B]
    pool.query(videoLot, fields.title,(err, videoIds, fields)=>{
        if (err) throw err
        params.unshift(videoIds)
        pool.query(newChoice, params, (err, video, fields)=>{
            if (err) throw err
            console.log(params)
        })
     return
    })
}

const addVideo = (params, upload, newFilename) => {
    const newVideo = `INSERT INTO videos (title, type, url, description, edition_id) VALUES (?,?,?,?,?)`
    let oldPath = upload.video.filepath
    let newPath = `public/videos/${newFilename}`
    pool.query(newVideo, params, (err, video, fields)=>{
        if (err) throw err
        fs.copyFile(oldPath, newPath, (err) => {
            if (err) throw err
        })
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
                  //  if(yearOptions.includes(fields.edition)){  validiter de l'année
                  console.log(fields)
                        const message = 'Video uploaded succesfully !'
                        let params = [fields.title, fields.type, newUrl, fields.description]
                        if(!fields.editionId) { // verrifie si cette année existe deja en BDD
                            pool.query(newEdition, fields.edition, (err, edition, fields)=>{
                                if (err) throw err
                                params.push(edition.insertId)
                                res.json(addVideo(params, upload, newFilename))
                            })
                        } else {
                            params.push(fields.editionId)
                            addVideo(params, upload, newFilename)
                        }
                        res.json(message)
                        if(fields.choice_B){
                            res.json(addChoice(fields, upload))
                        }
            } else {
                message = 'Your video must have one of the following extensions : '+accepted
                res.json(message)
            }
        }
    })
}


export default uploadVideo