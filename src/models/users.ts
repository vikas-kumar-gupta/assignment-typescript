import mongoose, {Schema, model} from 'mongoose';

interface User {
    username: String,
    password: String,
    email: String,
    status: Boolean
}

const UserSchema = new Schema<User>({
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
        type: Boolean,
        required: true
    }
})

const User = model<User>('User', UserSchema);

export default User;