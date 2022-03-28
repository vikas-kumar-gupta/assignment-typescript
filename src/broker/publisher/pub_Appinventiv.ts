import mqtt from "mqtt";
const client = mqtt.connect("mqtt://localhost:3050");

const topic_Appinventiv = "Appinventiv"

let msg_Appinventiv = 'Hello Appinventiv';

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic_Appinventiv, msg_Appinventiv);
        console.log(`msg sent: ${msg_Appinventiv}`);
    }, 3000)
})