import mongoose, {connect} from 'mongoose';

const connection = async () => {
    return connect("mongodb://localhost:27017/test")
    .then(() => {
        console.log('database connection established');
    })
    .catch((err: Error) => {
        console.log(err);
    })
}

export default connection;