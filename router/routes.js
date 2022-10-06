import express from "express"
import videoList from '../controllers/videolist.js'
import login from '../controllers/login.js'
import register from '../controllers/register.js'
import logout from '../controllers/logout.js'

const router = express.Router()

router.get("/api", videoList)
router.post("/api/register", register)
router.post("/api/login", login)
router.get("/api/logout", logout)

export default router 