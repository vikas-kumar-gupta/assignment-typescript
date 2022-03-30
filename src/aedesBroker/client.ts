import express, { Request, Response } from 'express'
import mqtt from "async-mqtt";
const topic = 'topic-123';
// const subs = async (req: Request, res: Response) => {
//     const { username, password }: any = req.body;
//     const options: any = {
//         username: username, password: password
//     }

    const client = mqtt.connect("http://localhost:5000", {clientId : "vikash007",username : "vikash001",password : "12345"});
    console.log('client connected');
    //res.status

    // client.on("error", (err: any, status: any) => {
    //     res.status(400).send(err.message);
    //     process.exit()
    // })

    client.on('message', (topic, message) => {
        console.log("topic: hfjhfjhfhhf");
        console.log(`message: ${message}`);
    })
// }
// export default subs;