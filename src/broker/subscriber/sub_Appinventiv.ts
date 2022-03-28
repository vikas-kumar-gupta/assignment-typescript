import mqtt from "mqtt";
const client = mqtt.connect("mqtt://localhost:3050");

//  topics
const topic_Appinventiv = "Appinventiv";

let topics = [topic_Appinventiv]

client.on('connect', () => {
    client.subscribe(topics)
    console.log(`${topics} subscribed`);
})

client.on('message', (topics, message: String) => {
    console.log(message.toString());
})