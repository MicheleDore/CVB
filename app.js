import express from "express"
import cors from "cors"
import session from "express-session"
import parseurl from 'parseurl'
import bodyParser from 'body-parser'
import pool from './config/database.js'
import bcrypt from 'bcrypt'
import router from './router/routes.js'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"))

// app.use(session({
// 	secret: 'keyboard cat',
// 	resave:false,
// 	saveUninitialized: true,
// 	cookie: {maxAge: 3600000}
// }))

// app.use( function (req, res, next){
//     res.locals.user = req.session.user || null;
//     res.locals.admin = req.session.admin || false
//     	console.log(req.session.user)
//     	console.log(req.session.admin)
//     	console.log(res.locals.user)
//     	console.log(res.locals.admin)
//     next();
// })
// app.use((req, res, next)=>{
//     	let pathname = parseurl(req).pathname.split('/');
//         const adminPath =  ['/admin']
//     	if(!req.session.admin && adminPath.includes(pathname[1])){
//     		res.redirect('/login');
//     	}
//     	else{
//     		next();
//   	}
// })

app.use('/', router)

const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
