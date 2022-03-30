"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_mqtt_1 = __importDefault(require("async-mqtt"));
const topic = 'topic-123';
// const subs = async (req: Request, res: Response) => {
//     const { username, password }: any = req.body;
//     const options: any = {
//         username: username, password: password
//     }
const client = async_mqtt_1.default.connect("http://localhost:5000", { clientId: "vikash007", username: "vikash001", password: "12345" });
console.log('client connected');
//res.status
// client.on("error", (err: any, status: any) => {
//     res.status(400).send(err.message);
//     process.exit()
// })
client.on('message', (topic, message) => {
    console.log("topic: hfjhfjhfhhf");
    console.log(`message: ${message}`);
});
// }
// export default subs;
