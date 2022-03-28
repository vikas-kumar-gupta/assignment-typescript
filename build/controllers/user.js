"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMsg = exports.updateUser = exports.userDetail = exports.getAllUsers = exports.deleteUser = exports.logIn = exports.signUp = void 0;
const express_1 = __importDefault(require("express"));
const mqtt_1 = __importDefault(require("mqtt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const md5_1 = __importDefault(require("md5"));
const app = (0, express_1.default)();
const users_1 = __importDefault(require("../models/users"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, status } = req.body;
        const hashPassword = (0, md5_1.default)(password);
        const query = { username: username, password: hashPassword, email: email, status: status };
        const user = new users_1.default(query);
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, "satyamev-jayte");
        res.cookie('jwt', token, { expires: new Date(Date.now() + 600000) });
        user.save(err => {
            if (err) {
                res.status(404).json({ error: true, message: err.message });
            }
            else {
                res.status(200).json({ message: "data updated successfully" });
            }
        });
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const hashPassword = (0, md5_1.default)(password);
        const user = yield users_1.default.findOne({ username: username, password: hashPassword });
        const token = req.cookies.jwt;
        if (token == undefined && user) {
            const newToken = jsonwebtoken_1.default.sign({ _id: user._id }, "satyamev-jayte");
            res.cookie('jwt', newToken, { expires: new Date(Date.now() + 600000) });
            if (user) {
                res.status(200).json({ message: "login successful", user: user });
            }
            else {
                res.status(404).json({ message: "incorrect username or password" });
            }
        }
        else {
            if (user) {
                res.status(200).json({ message: "already logged in" });
            }
            else {
                res.status(404).json({ message: "incorrect username or password" });
            }
        }
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.logIn = logIn;
const userDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = yield users_1.default.findOne({ username: username });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "could not find user" });
        }
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.userDetail = userDetail;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.find();
        res.status(200).json({ numberOfUsers: user.length, usersData: user });
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = users_1.default.findOneAndDelete({ username: username }, (err, data) => {
            if (err) {
                res.status(404).json({ error: true, message: err });
            }
            else {
                if (data) {
                    res.status(200).json({ message: "user deleted successfully", user: data });
                }
                else {
                    res.status(404).json({ message: "user does not exist" });
                }
            }
        });
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const { password, email, status } = req.body;
        const hashPassword = (0, md5_1.default)(password);
        users_1.default.findOneAndUpdate({ username: username }, { password: hashPassword, email: email, status: status }, null, (err, data) => {
            if (err) {
                res.status(404).json({ error: true, message: err });
            }
            else {
                res.status(200).json({ message: "user updated successfully.", user: data });
            }
        });
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.updateUser = updateUser;
const sendMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (token != undefined || null) {
            const varifyToken = jsonwebtoken_1.default.verify(token, 'satyamev-jayte');
            console.log('token verified');
            const client = mqtt_1.default.connect("mqtt://localhost:3050");
            const { message } = req.body;
            const topic_Appinventiv = "Appinventiv";
            let msg_Appinventiv = `Hello Appinventiv`;
            client.on('connect', () => {
                client.publish(topic_Appinventiv, message);
                console.log(`msg sent: ${message}`);
                res.status(200).json({ message: 'message sent successfully' });
            });
        }
        else {
            res.status(404).json({ message: 'toekn is not verified' });
        }
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.sendMsg = sendMsg;
