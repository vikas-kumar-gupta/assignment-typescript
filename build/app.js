"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const user_1 = __importDefault(require("./routes/user"));
const normal_1 = __importDefault(require("./routes/normal"));
dotenv_1.default.config({ path: '../.env' });
// import brokerRoute from './routes/broker'
/**
 * TODO:
    1. implement env variables
 */
const app = (0, express_1.default)();
const port = process.env.PORT;
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
};
const swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecs));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.default)();
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
app.use('/', user_1.default);
app.use('/', normal_1.default);
// app.use('/broker', brokerRoute)
app.listen(port, () => {
    console.log(`listning on ${port}`);
});
