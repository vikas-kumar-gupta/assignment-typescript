import { CONFIG } from './constant'
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';

import connetion from './config/db'
import * as v1Route from './routes/index'
dotenv.config({path: '../.env'});
// import brokerRoute from './routes/broker.route'

const app: Application = express();

const port = process.env.PORT

/**
 * TODO:
 * 1. remove extra files (after versioning)     Done
 * 2. Update controllers error
 * 3. implement constant messages
 * 4. validation (DB, requests)
 * 
 * @fix
 * 1. .env path
 * 2. message-broker
 * 
 */

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS Project Setup',
            version: '1.0.0',
            description: 'complete setup of node project following the standards and file architectures'
        },
        // basePath: '/v1',
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ['../src/app.ts', '../src/routes/v1/*.ts']
}

const swaggerSpecs = swaggerJSDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use('/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

app.use(express.json())
app.use(cookieParser())

// for database connection
connetion();

// v1 routes
app.use('/v1', v1Route.userRoute.default)
app.use('/v1', v1Route.normalRoute.default)

app.listen(port, (): void => {  
    console.log(`listning on ${port}`);
})