import bcrypt from 'bcrypt';
import {asyncQuery} from '../config/database.js';
import {generateToken} from "../controllers/token.js"

const getUserData = async (email) => {
    let loginRequest = "SELECT users.*, votes.choice_id FROM users  JOIN votes ON votes.user_id=users.id WHERE email = ?";
    const user = await asyncQuery(loginRequest,[email])
    console.log(user)
    return user
}

const generateResponse = async (user,passwordMatch) => {
    const ADMIN_ROLE_ID = 1
    const admin = user.role_id === ADMIN_ROLE_ID
    let userChoices = []
    user.map((item,i)=>{ userChoices.push(item.choice_id)})
    const userData = { 
        name: user[0].nickname, 
        id: user[0].id, 
        admin, 
        userChoices: userChoices
    }
    const token = await generateToken(userData)
    const sucessJson = {response:true, admin, token}
    const failJson = {response:false, message:"identifiant ou mot de passe incorrect"}
    
    return passwordMatch ? sucessJson : failJson
}

const logIn = async (req, res) => {
    const {password, email} = req.body
    const userDataSQL = await getUserData(email)
    console.log(userDataSQL)
    const passwordMatch = await bcrypt.compare(password, userDataSQL.password)
    const response = await generateResponse(userDataSQL, passwordMatch)
    
    res.json(response)
}

export default logIn;