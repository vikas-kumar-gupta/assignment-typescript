import express, {Application, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import userRoute from './routes/user'

const app: Application = express();
const port: Number = 3000;

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/test");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (): void => {
  console.log("Connection Successful!");
});

app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to the landing page"})
})

app.use('/', userRoute)

app.get('/*', async (req: Request, res: Response) => {
    res.status(404).json({message:"Path Not Found"});
})

app.listen(port, (): void => {
    console.log(`listning on ${port}`);
})