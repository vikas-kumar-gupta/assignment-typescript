"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerFunc = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../../.env' });
const swaggerFunc = () => {
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
        apis: ['../../src/routes/*/*.ts', `${process.cwd()}/src/routes/*/*.ts`]
    };
    const swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
    return swaggerSpecs;
};
exports.swaggerFunc = swaggerFunc;
