import mosca from "mosca";

const settings: any = {
    host: 'localhost',
    port: 3050
}

const broker: any = new mosca.Server(settings);

broker.on('ready', () => {
    console.log('broker connected');
})