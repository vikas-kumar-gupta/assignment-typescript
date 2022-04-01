import { CONFIG } from './constant'
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import connetion from './config/db'
import * as v1Route from './routes/index'
import { handleError } from './middlewares/error.middleware';
// import {swaggerFunc} from './lib/swagger'
// import brokerRoute from './routes/broker.route'

const app: Application = express();

const port = CONFIG.PORT

/**
 * TODO:
 * 1. remove extra files (after versioning)     Done
 * 2. Update controllers error                  Done
 * 3. implement constant messages               Done
 * 4. validation (DB, requests)                 Done
 * 5. swagger responses                         Done
 * 
 * @fix
 * 1. .env path                                 Done
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
        // schemes:['https', 'http'],
        // basePath: '/v1',
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    name: "x-auth-token",
                    scheme: "bearer",
                    in: "header",
                },
            },
        }
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
// app.use(handleError)

app.listen(port, (): void => {  
    console.log(`listning on ${port}`);
})