import mongoose, {connect} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});


const connection = async () => {
    return connect(<string>process.env.MONGODB_URL)
    .then(() => {
        console.log('database connection established');
    })
    .catch((err: Error) => {
        console.log(err);
    })
}

export default connection;