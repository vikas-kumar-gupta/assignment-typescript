"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const client = mqtt_1.default.connect("mqtt://localhost:3050");
//  topics
const topic_Appinventiv = "Appinventiv";
let topics = [topic_Appinventiv];
client.on('connect', () => {
    client.subscribe(topics);
    console.log(`${topics} subscribed`);
});
client.on('message', (topics, message) => {
    console.log(message.toString());
});
