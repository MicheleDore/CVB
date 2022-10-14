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

const addToDB = (params, upload, newFilename) => {
    const newVideo = `INSERT INTO videos (title, type, url, description, edition_id) VALUES (?,?,?,?,?)`
    const newChoice = `INSERT INTO interactions (title, type, url, description, edition_id) VALUES (?,?,?,?,?)`
    let oldPath = upload.video.filepath
    let newPath = `public/videos/${newFilename}`
    const message = 'Video uploaded succesfully !'
    pool.query(newVideo, params, (err, video, fields)=>{
        if (err) throw err
        fs.copyFile(oldPath, newPath, (err) => {
            if (err) throw err
        })
    })
     return(message)
}

const uploadVideo = (req, res) => {
    const form = formidable({keepExtensions: true});
    const newEdition = `INSERT INTO editions (year) VALUES (?)`
    form.parse(req, (err, fields, upload) => {
        if (err) throw err
        let yearOptions = fields.years.split(',')
        let newFilename = upload.video.newFilename
        let newUrl  = `http://micheledore.sites.3wa.io:9300/videos/${newFilename}`
        let message
        if(upload.originalFilename !== ''){
            if(checkAcceptedExtensions(upload.video)){
                    if(yearOptions.includes(fields.edition)){ // validiter de l'année
                        let params = [fields.title, fields.type, newUrl, fields.description]
                        if(!fields.editionId) { // verrifie si cette année existe deja en BDD
                            pool.query(newEdition, fields.edition, (err, edition, fields)=>{
                                if (err) throw err
                                params.push(edition.insertId)
                                res.json(addToDB(params, upload, newFilename))
                            })
                        } else {
                            params.push(fields.editionId)
                            res.json(addToDB(params, upload, newFilename))
                        }
                        
                    } else {
                        message = 'Please select a suitable edition'
                        res.json(message)
                    }
                    
            } else {
                message = 'Your video must have one of the following extensions : '+accepted
                res.json(message)
            }
        }
    })
}


export default uploadVideo