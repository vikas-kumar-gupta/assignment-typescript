const mqtt = require('async-mqtt');
import User from '../models/users.medel'
async function emmmmmit(options: any) {
    const {username, password, message} = options;
    try{
        const user = await User.findOne(options);
        if(user){
            const client = mqtt.connect("http://localhost:5000", {username: username, password: password});
            
            client.on('connect', () => {
                client.publish('topic-123', message);
                return 1;                
            })
        }else{
            console.log("User does not exists");
        }
    }
    catch(err: any){
        console.log(err.message);
        return 0;
    }
}

export default emmmmmit;