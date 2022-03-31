const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, function () {
    console.log('Server is listening to ', port)
})

aedes.on("client", function (client) {
    console.log(client.id + " is connected")
})

aedes.on('clientDisconnect', function (client) {
    console.log(client.id + " is Disconnected")
})

aedes.authenticate = (client, username, password, cb) => {
    if (username == "vishal23997" && password =="12345") {
        return cb(null, true);
    }
    else {
        return console.log(client.id," authetication failed");
    }
}
