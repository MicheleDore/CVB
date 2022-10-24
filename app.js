import middleware from './controllers/middleware.js'
import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import router from './router/routes.js'
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"))


app.use(middleware)

app.use('/', router)

const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
