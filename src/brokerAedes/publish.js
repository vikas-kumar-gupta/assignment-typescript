const mqtt = require('mqtt');
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGF5MDY5QGdtYWlsLmNvbSIsImlhdCI6MTY0ODUzMDkzOH0.rORbxpc_hHH7dG5XpUJ03ivg-WTw4TtnfD-f9EGq4_w"
const setting = {clientId:"vishal_pub",username:"vishal23997",password:"12345"}
const client = mqtt.connect('mqtt://localhost:1883',setting)
//console.log(client);
console.log("Before connection")
client.on('connect', function () {
    console.log("Connected before interval")
    setInterval(function () {
        console.log("Before publish")
        client.publish('News', 'Ipl has started');
        console.log('Message Sent');
    }, 5000);
});