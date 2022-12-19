import formidable from 'formidable';
import fs from 'fs';
import {query, asyncQuery, pool} from '../config/database.js'
import checkExtensions from './checkExtensions.js'
const extensions = ['mp4', 'avi', 'mov', 'avchd']

/*Ce controlleur permet aprés des vérifications d'insérer une vidéo en BDD et 
toutes le information correspondantes*/

const uploadVideo = (req, res) => {
    const form = formidable({keepExtensions: true});
    const newEdition = `INSERT INTO editions (year) VALUES (?)`
    form.parse(req, (err, fields, upload) => {
        console.log(fields)
        if (err) throw err
        let newFilename = upload.video.newFilename
        let newUrl  = `http://micheledore.sites.3wa.io:9300/videos/${newFilename}`
        let message
        /*Le module checkExtensions est appelé pour vérifier qu'il s'agit bien d'une fichier vidéo accepté*/
        if(checkExtensions(upload.video, extensions)){
                const message = 'Video uploaded succesfully !'
                let params = [fields.title, fields.type, newUrl, fields.description]
                /*Le controlleur vérifie si l'edition indiquée existe, en cas contraire elle en ajoute une
                nouvelle en base des données, puis appelle la function pour le chargement de la vidéo en BDD*/
                if(!fields.editionId) { 
                    pool.query(newEdition, fields.edition, (err, edition, fields)=>{
                        console.log(fields)
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
            message = 'Your video must have one of the following extensions : '+extensions
            res.json(message)
        }
    })
}

/*La vidéo est copiée dans le dossier public dans le back et les informations liées sont enregistrées en BDD*/

const addVideo = (params, upload, newFilename, infos) => {
    const newVideo = `INSERT INTO videos (title, type, url, description, edition_id) VALUES (?,?,?,?,?)`
    let oldPath = upload.video.filepath
    let newPath = `public/videos/${newFilename}`
    pool.query(newVideo, params, (err, video, fields)=>{
        if (err) throw err
        fs.copyFile(oldPath, newPath, (err) => {
            if (err) throw err
        })
        /*Si les données transmis par l'administrateur incluent le choix B, il faut ajouter une nouvelle interaction
        en BDD. Le choix B indique que la quatrième vidéo nécessaire au fonctionnement de la Metabox à été chargee.*/
        infos.choice_B && addChoice(infos)
    })
     return
}

/*Cette fonction permet de ressembler les données nécessaire à la mise en place d'une interaction et les enregistre en BDD*/

const addChoice = (fields) => {
    const videoLot = `SELECT id FROM videos WHERE title= ?`
    const newChoice = `INSERT INTO choices (movie_id, loop_id, ending_A, ending_B, dilemma, choice_A, choice_B) VALUES (?,?,?,?,?,?,?)`
    /*Les informations textuelles nécessaires à l'interaction sont entrées dans un tableau*/
    let params = [fields.dilemma, fields.choice_A, fields.choice_B]
    pool.query(videoLot, fields.title,(err, videoIds, fields)=>{
        if (err) throw err
        /*Les ids de vidéos correspondantes à l'interaction sont récuperés en BDD sur la base du titre et ajoutés au tableau pour 
        l'insertion en BDD*/
        params.unshift(videoIds[0].id,videoIds[1].id,videoIds[2].id,videoIds[3].id)
        pool.query(newChoice, params, (err, video, fields)=>{
            if (err) throw err
        })
     return
    })
}

export default uploadVideo