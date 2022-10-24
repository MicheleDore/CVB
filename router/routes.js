import express from "express"
import videoList from '../controllers/videolist.js'
import login from '../controllers/login.js'
import register from '../controllers/register.js'
import logout from '../controllers/logout.js'
import isLogged from '../controllers/isLogged.js'
import uploadVideo from '../controllers/uploadVideo.js'
import updateVideo from '../controllers/updateVideo.js'
import metaBox from '../controllers/metaBox.js'
import metaVote from '../controllers/metaVote.js'
import metaComment from '../controllers/metaComment.js'
import metaDebate from '../controllers/metaDebate.js'

const router = express.Router()

router.get("/api", videoList)
router.post("/api/register", register)
router.post("/api/login", login)
router.post("/api/isLogged", isLogged)
router.get("/api/logout", logout)
router.post("/api/admin", uploadVideo)
router.post("/api/admin/update", updateVideo)
router.get("/api/metabox/:movie", metaBox)
router.post("/api/debate", metaDebate)
router.post("/api/comment", metaComment)
router.post("/api/metavote", metaVote)

export default router 