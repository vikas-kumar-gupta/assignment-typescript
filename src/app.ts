import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import connetion from './config/db'
import userRoute from './routes/user'
import normalRoute from './routes/normal'

const app: Application = express();
const port: Number= 4000

app.use(express.json())
app.use(cookieParser())

connetion();

app.use('/', userRoute)
app.use('/', normalRoute)

app.listen(port, (): void => {
    console.log(`listning on ${port}`);
})