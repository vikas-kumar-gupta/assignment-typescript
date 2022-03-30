"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aedes = require('aedes')();
const net_1 = __importDefault(require("net"));
const server = net_1.default.createServer(aedes.handle);
const port = 5000;
server.listen(port, () => {
    console.log("Listening on port " + port);
});
aedes.on("client", (client) => {
    console.log(`${client._parser.settings.username} connected`);
});
aedes.on("clientDisconnect", (client) => {
    console.log(`Client ${client._parser.settings.username} disconnected`);
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
aedes.authenticate = (client, username, password, cb) => {
    if (username == "vikash001" && password == "12345") {
        return cb(null, true);
    }
    else {
        return console.log(client.id + " authentication failed");
    }
};
