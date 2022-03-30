const aedes = require('aedes')()
import net from 'net'
const server = net.createServer(aedes.handle)
const port = 5000;

server.listen(port, () => {
    console.log("Listening on port " +  port);
});

aedes.on("client", (client : any)=>{
    console.log(`${client._parser.settings.username} connected`);
});

aedes.on("clientDisconnect", (client: any) => {
    console.log(`Client ${client._parser.settings.username} disconnected`);
});

aedes.on("subscribe", (subscripton: any, client:any) => {
    console.log(`Listner ${client.id} subscribed to ${subscripton[0].topic}`);
});

aedes.on("unsubscribe", (subscripton: any, client: any) => {
    console.log(`Listner ${client.id} unsubscribed to ${subscripton[0].topic}`);
});

aedes.on("publish", (packet: any) => {
    console.log("Publish")
    console.log(packet.payload.toString());
})

aedes.authenticate = (client:any,username:any,password:any,cb:any)=>{
    if(username == "vikash001" && password == "12345"){
        return cb(null,true);
    }else{
        return console.log(client.id + " authentication failed");
        
    }
}