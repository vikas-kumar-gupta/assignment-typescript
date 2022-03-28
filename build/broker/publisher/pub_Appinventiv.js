"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const client = mqtt_1.default.connect("mqtt://localhost:3050");
const topic_Appinventiv = "Appinventiv";
let msg_Appinventiv = 'Hello Appinventiv';
client.on('connect', () => {
    setInterval(() => {
        client.publish(topic_Appinventiv, msg_Appinventiv);
        console.log(`msg sent: ${msg_Appinventiv}`);
    }, 3000);
});
