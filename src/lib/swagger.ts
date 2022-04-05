import { CONFIG } from '../constant'
import swaggerJSDoc from 'swagger-jsdoc';

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
                    url: `http://localhost:${CONFIG.PORT}`
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
            },
        },
        apis: ['../src/app.ts', '../src/routes/v1/*.ts']
    }

    const swaggerSpecs = swaggerJSDoc(options)

    return swaggerSpecs
}