"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const db_1 = __importDefault(require("./config/db"));
const v1Route = __importStar(require("./routes/index"));
// import {swaggerFunc} from './lib/swagger'
// import brokerRoute from './routes/broker.route'
const app = (0, express_1.default)();
const port = constant_1.CONFIG.PORT;
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
};
const swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecs));
app.use('/v1/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecs));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// for database connection
(0, db_1.default)();
// v1 routes
app.use('/v1', v1Route.userRoute.default);
app.use('/v1', v1Route.normalRoute.default);
// app.use(handleError)
app.listen(port, () => {
    console.log(`listning on ${port}`);
});
