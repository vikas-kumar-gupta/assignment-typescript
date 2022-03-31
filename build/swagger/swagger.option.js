"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../../.env' });
exports.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Complete Node JS Project Setup',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ]
    },
    // apis: ['../src/app.ts', '../src/routes/v1/*.ts']
    apis: ['../../src/app.ts', '../../src/routes/*/*.ts', '../../src/routes/*.ts']
};
