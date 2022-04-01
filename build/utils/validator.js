"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdate = exports.username = exports.userLogIn = exports.userSignup = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSignup = joi_1.default.object({
    username: joi_1.default.string().trim().min(3).max(15).lowercase().required(),
    password: joi_1.default.string().min(5).required(),
    email: joi_1.default.string().trim().email().required(),
    status: joi_1.default.string().trim().uppercase()
});
exports.userLogIn = joi_1.default.object({
    username: joi_1.default.string().trim().min(3).lowercase().required(),
    password: joi_1.default.string().min(5).max(20).required()
});
exports.username = joi_1.default.object({
    username: joi_1.default.string().trim().min(3).lowercase().required()
});
exports.userUpdate = joi_1.default.object({
    password: joi_1.default.string().min(5).max(20),
    email: joi_1.default.string().trim().email().required(),
    status: joi_1.default.string().trim().uppercase()
});
