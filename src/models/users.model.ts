import { DBENUMS } from '../constant'
import md5 from 'md5';
import mongoose, { Schema, model } from 'mongoose';

import {IUser} from '../interfaces/model.interface'

/***
 * TODO:
 * 1. Implement hooks for hashing the password                  --Pending
 */

const userSchema = new Schema<IUser>({
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

// hashing password using pre hook
userSchema.pre('save', function (next) {
    try{
        if(this.isModified('password') || this.isNew) {
            this.password = md5(this.password)
        }
        next()
    }
    catch(err: any) {
        next(err)
    }
})

const User = model<IUser>('User', userSchema);

export default User;