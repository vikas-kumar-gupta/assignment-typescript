import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';


import connetion from './config/db'
import userRoute from './routes/user'
import normalRoute from './routes/normal'
dotenv.config({path: '../.env'});
// import brokerRoute from './routes/broker'

/**
 * TODO:
    1. implement env variables
 */


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
                url: 'localhost:3000/'
            }
        ]
    },
    apis: ['./app.ts']
}

const swaggerSpecs = swaggerJSDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use(express.json())
app.use(cookieParser())

connetion();

/**
 * @swagger
 * /:login
 *  post:
 *      summary: This is user login route
 *      description: This is user login
 *      responses:
 *          200:
 *              description: to test post method
 */

app.use('/', userRoute)
app.use('/', normalRoute)
// app.use('/broker', brokerRoute)

app.listen(port, (): void => {
    console.log(`listning on ${port}`);
})