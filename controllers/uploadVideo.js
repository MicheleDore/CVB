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

const uploadVideo = (req, res) => {
    const form = formidable({keepExtensions: true});
    const newVideo = `INSERT INTO videos (title, type, url, description, edition_id) VALUES (?,?,?,?,?)`
    const newEdition = `INSERT INTO editions (year) VALUES (?)`
    form.parse(req, (err, fields, upload) => {
        if (err) throw err
        let yearOptions = fields.years.split(',')
        let editionId = fields.editionId
        // let editionsId = fields.editions[0].split(',')
        // let editionsYears = fields.editions[1].split(',')
        let newFilename = upload.video.newFilename
        let oldPath = upload.video.filepath
        let newPath = `public/videos/${newFilename}`
        let newUrl  = `http://micheledore.sites.3wa.io:9300/videos/${newFilename}`
        let message
        if(upload.originalFilename !== ''){
            if(checkAcceptedExtensions(upload.video)){
                if(yearOptions.includes(fields.edition)){
                    if(!editionId) {
                        pool.query(newEdition, fields.edition, (err, edition, fields)=>{
                            if (err) throw err
                            editionId = edition.insertId
                        })
                    }
                    console.log(editionId)
                    let params = [fields.title, fields.type, newUrl, fields.description, editionId]
                    pool.query(newVideo, params, (err, video, fields)=>{
                            if (err) throw err
                            fs.copyFile(oldPath, newPath, (err) => {
                                if (err) throw err
                                message = 'Video uploaded succesfully !'
                                res.json(message)
                            })
                    })
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