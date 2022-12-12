import express from "express"
import videoList from '../controllers/videolist.js'
import login from '../controllers/login.js'
import register from '../controllers/register.js'
import logout from '../controllers/logout.js'
import isLogged from '../controllers/isLogged.js'
import uploadVideo from '../controllers/uploadVideo.js'
import updateVideo from '../controllers/updateVideo.js'
import deleteComment from '../controllers/deleteComment.js'
import metaBox from '../controllers/metaBox.js'
import metaVote from '../controllers/metaVote.js'
import metaComment from '../controllers/metaComment.js'
import metaDebate from '../controllers/metaDebate.js'

const router = express.Router()

router.get("/api", videoList)/*ce controlleur interroge la BDD à propos des vidéo qu'y sont stockées*/
router.post("/api/register", register)
router.post("/api/login", login)
router.post("/api/isLogged", isLogged)/*ce controlleur vérifie le token dans le back pour prolonger la session utilisateur*/
router.get("/api/logout", logout)/*ce controlleur efface la session à la réquéte axios correspondante*/
router.post("/api/admin", uploadVideo)/*ce controlleur permet de insérer une vidéo en BDD*/
router.post("/api/admin/update", updateVideo)/*ce controlleur permet de remplacer une vidéo en BDD*/
router.post("/api/delete/:comment", deleteComment)/*ce controlleur permet à l'administrateur d'effacer un commentaire en BDD*/
router.get("/api/metabox/:movie", metaBox)/*ce controlleur interroge la BDD à propos des informations nécessaires à l'XU*/
router.get("/api/debate/:choice", metaDebate)/*ce controlleur interroge la BDD à propos des commentaires liées à l'interaction en cours*/
router.post("/api/comment", metaComment)/*ce controlleur enregistre en BDD le commentaire laissé par l'utilisateur*/
router.post("/api/metavote", metaVote)/*ce controlleur enregistre en BDD la valeur (1 ou 2) de l'interaction effectuée par l'utilisateur*/

export default router 