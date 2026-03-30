import express, {Request, Response} from 'express'
import eventRoute from "./routes/EventRoute";
const app = express()
const port = 3000
app.use(express.json())
app.use('/events',eventRoute);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
