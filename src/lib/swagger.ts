import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});

export const swaggerFunc = () => {
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
                    url: `http://localhost:${process.env.PORT}`
                }
            ]
        },
        apis: ['../../src/routes/*/*.ts', `${process.cwd()}/src/routes/*/*.ts` ]
    }

    const swaggerSpecs = swaggerJSDoc(options)

    return swaggerSpecs
}