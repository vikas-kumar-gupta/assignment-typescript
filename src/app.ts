import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';

import { CONFIG } from './constant'
import connetion from './config/db'
import userRoute from './routes/user.route'
import normalRoute from './routes/normal.route'
dotenv.config({path: '../.env'});
// import brokerRoute from './routes/broker.route'

const app: Application = express();

const port = process.env.PORT

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Complete NOde JS Project Setup',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ['../src/app.ts', '../src/routes/*.ts']
}

const swaggerSpecs = swaggerJSDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use(express.json())
app.use(cookieParser())

connetion();

app.use('/', userRoute)
app.use('/', normalRoute)
// app.use('/broker', brokerRoute)

app.listen(port, (): void => {
    console.log(`listning on ${port}`);
})