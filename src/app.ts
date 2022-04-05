import { CONFIG } from './constant'
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import connetion from './config/db'
import * as v1Route from './routes/index'
import { swaggerFunc } from './lib/swagger'

const app: Application = express();

const port = CONFIG.PORT

app.use(express.json())
app.use(cookieParser())

// swagger documentation setup
app.use('/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFunc()))

// for database connection
connetion();

// v1 routes
app.use('/v1', v1Route.userRoute.default)
app.use('/v1', v1Route.normalRoute.default)

app.listen(port, (): void => {
    console.log(`listning on ${port}`);
})