import express from 'express'
import path from 'path';
import eventRoute from "./routes/EventRoute";
import uploadfileRoute from './routes/UploadFileRoutes';
import cors, {CorsOptions} from 'cors';


const app = express()
const port = 3000


const corsOptions:CorsOptions = {
    origin: [
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:5050',
        'http://127.0.0.1:5050'
    ],
    methods: ['GET','POST','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
};

app.use(cors(corsOptions))
app.use(express.json())
app.use('/events',eventRoute);
app.use('/uploadfile', uploadfileRoute);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



const webApp = express()
const webPort = 5050
webApp.use(express.static(path.join(process.cwd())));
webApp.listen(webPort, () => {
    console.log(`WebApp listening at http://localhost:${webPort}`)
})
