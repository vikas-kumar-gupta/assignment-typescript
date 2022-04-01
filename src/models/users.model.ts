import { DBENUMS } from '../constant'
import mongoose, { Schema, model } from 'mongoose';

//  creating user interface
interface User {
    username: String,
    password: String,
    email: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: DBENUMS.STATUS,
        default: DBENUMS.STATUS[0],
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    }
})

const User = model<User>('User', userSchema);

export default User;