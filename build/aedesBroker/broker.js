"use strict";
// import aedes from 'aedes';
const aedes = require('aedes')();
//!import userModel here
const server = require('net').createServer(aedes.handle);
const port = 5000;
server.listen(port, () => {
    console.log("Listening on port " + port);
});
aedes.on("client", function (client) {
    console.log(`Client ${client.id} with user name ${client._parser.settings.username} connected`);
    console.log(client._parser.settings.password.toString());
});
aedes.on("clientDisconnect", (client) => {
    console.log(`Client ${client.id} disconnected`);
});
aedes.on("subscribe", (subscripton, client) => {
    console.log(`Listner ${client.id} subscribed to ${subscripton[0].topic}`);
});
aedes.on("unsubscribe", (subscripton, client) => {
    console.log(`Listner ${client.id} unsubscribed to ${subscripton[0].topic}`);
});
aedes.on("publish", (packet) => {
    console.log("Publish");
    console.log(packet.payload.toString());
});
