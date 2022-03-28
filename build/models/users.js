"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
        enum: ['active', 'deactivated', 'incomplete'],
        default: 'active',
    },
    createdAt: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
