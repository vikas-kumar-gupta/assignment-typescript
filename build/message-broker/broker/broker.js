"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mosca_1 = __importDefault(require("mosca"));
const settings = {
    host: 'localhost',
    port: 3050
};
const broker = new mosca_1.default.Server(settings);
broker.on('ready', () => {
    console.log('broker connected');
});
