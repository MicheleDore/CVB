import parseurl from 'parseurl';
import {verifyToken} from './token.js'

const ADMIN = 'admin'
const USER = 'user'

/*le middleware protège les routes admin et la route metavote,
pour réserver l'interaction aux utilisateur connectés*/

const protectedPath = (pathname) => {
    const adminPath = ['admin'];
    const userPath = ['metavote'];
    
    const protectedAdmin = adminPath.includes(pathname)
    const protectedUser = userPath.includes(pathname)
    
    if(protectedAdmin){
        return ADMIN
    } else if(protectedUser){
        return USER
    } else {
        return false
    }
}

const accesAutorized = (pathname,userData) => {
    if(protectedPath(pathname) === ADMIN){
        if(userData){
            return userData.admin
        }
        return false
    } else if(protectedPath(pathname) === USER) {
        if(userData){
            return userData.user
        }
        return false
    } else {
        return true
    }
}

/*Le token provenant du front est utilisé pour vérifier l'état de la connection */

const middleware = async (req, res, next) => {
    let pathname = parseurl(req).pathname.split('/')[2];
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
    const userData = await verifyToken(token)
    if(accesAutorized(pathname,userData)){
        next()
    } else {
        res.json({response:false, msg:'access denied'})
    }
}

export default middleware