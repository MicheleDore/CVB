import express from "express"
import login from '../controllers/login.js'
import register from '../controllers/register.js'
// import logout from '../controllers/logout.js'

const router = express.Router()

router.post("/api/register", register)
router.post("/api/login", login)


export default router 