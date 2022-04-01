"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendMsg = exports.reactivateUser = exports.deactivateUser = exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.userDetail = exports.logIn = exports.signUp = void 0;
const constant_1 = require("../../constant");
const express_1 = __importDefault(require("express"));
const mqtt_1 = __importDefault(require("mqtt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const md5_1 = __importDefault(require("md5"));
const app = (0, express_1.default)();
const users_model_1 = __importDefault(require("../../models/users.model"));
const validate = __importStar(require("../../utils/validator"));
/**
 * @description this method will recieve the username, password and email from the body
 */
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        // validating the user inputs
        yield validate.userSignup.validateAsync(req.body);
        // check wheather user or email addresss already registred
        const isUserExists = yield users_model_1.default.findOne({ $or: [{ email: email }, { username: username }] });
        if (!isUserExists) {
            const hashPassword = (0, md5_1.default)(password);
            const query = { username: username, password: hashPassword, email: email, status: status, createdAt: new Date().getTime() };
            const user = new users_model_1.default(query);
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, "satyamev-jayte");
            res.cookie('jwt', token, { expires: new Date(Date.now() + 600000) });
            user.save(err => {
                if (err) {
                    throw new Error(constant_1.STATUS_MSG.ERROR.BAD_REQUEST.message);
                }
                else {
                    res.status(201).json(constant_1.STATUS_MSG.SUCCESS.CREATED);
                }
            });
        }
        else {
            res.status(400).json(constant_1.STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('email or username is already registered'));
        }
    }
    catch (err) {
        if (err.isJoi === true) {
            err.status = 422;
        }
        // next(err)
        res.status(constant_1.STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(constant_1.STATUS_MSG.ERROR.BAD_REQUEST);
    }
});
exports.signUp = signUp;
/**
 * @description this method will recieve the username and password from the body
 */
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        yield validate.userLogIn.validateAsync(req.body);
        const hashPassword = (0, md5_1.default)(password);
        const user = yield users_model_1.default.findOne({ username: username, password: hashPassword });
        const token = req.cookies.jwt;
        if (token == undefined && user) {
            const newToken = jsonwebtoken_1.default.sign({ _id: user._id }, "satyamev-jayte");
            res.cookie('jwt', newToken, { expires: new Date(Date.now() + 600000) });
            if (user) {
                res.status(200).json(constant_1.STATUS_MSG.SUCCESS.DEFAULT);
            }
            else {
                res.status(400).json(constant_1.STATUS_MSG.ERROR.INCORRECT_CREDENTIALS);
            }
        }
        else {
            if (user) {
                res.status(200).json(constant_1.STATUS_MSG.ERROR.TOKEN_ALREADY_EXIST);
            }
            else {
                res.status(400).json(constant_1.STATUS_MSG.ERROR.INCORRECT_CREDENTIALS);
            }
        }
    }
    catch (err) {
        if (err.isJoi) {
            err.status = 422;
        }
        next(err);
    }
});
exports.logIn = logIn;
/**
 * @description receives the user data from body to be updated
 */
const userDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = yield users_model_1.default.findOne({ username: username });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(400).json(constant_1.STATUS_MSG.ERROR.NOT_EXIST(username));
        }
    }
    catch (err) {
        res.status(400).json(constant_1.STATUS_MSG.ERROR.BAD_REQUEST);
    }
});
exports.userDetail = userDetail;
/**
 * @description displays all the user
 */
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.find();
        if (!user) {
            res.status(constant_1.STATUS_MSG.SUCCESS.EMPTY_RECORD.statusCode).json(constant_1.STATUS_MSG.SUCCESS.EMPTY_RECORD);
        }
        res.status(200).json(user);
    }
    catch (err) {
        // next(err);
        res.status(400).json(constant_1.STATUS_MSG.ERROR.BAD_REQUEST);
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = users_model_1.default.findOneAndDelete({ username: username }, (err, data) => {
            if (err) {
                throw err;
            }
            else {
                if (data) {
                    res.status(200).json(constant_1.STATUS_MSG.SUCCESS.DELETED);
                }
                else {
                    res.status(400).json(constant_1.STATUS_MSG.ERROR.NOT_EXIST(username));
                }
            }
        });
    }
    catch (err) {
        res.status(400).json(constant_1.STATUS_MSG.ERROR.BAD_REQUEST);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const { password, email, status } = req.body;
        yield validate.userUpdate.validateAsync(req.body);
        const hashPassword = (0, md5_1.default)(password);
        const updatedAt = new Date().getTime();
        users_model_1.default.findOneAndUpdate({ username: username }, { password: hashPassword, email: email, status: status, updatedAt: updatedAt }, null, (err, data) => {
            if (err) {
                res.status(400).json(constant_1.STATUS_MSG.ERROR.BAD_REQUEST);
            }
            else {
                res.status(200).json(constant_1.STATUS_MSG.SUCCESS.UPDATED);
            }
        });
    }
    catch (err) {
        if (err.isJoi) {
            err.status = 422;
        }
        res.status(400).json(constant_1.STATUS_MSG.ERROR.BAD_REQUEST);
    }
});
exports.updateUser = updateUser;
const deactivateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        let user = yield users_model_1.default.findOne({ username: username });
        if (!user) {
            throw new Error(constant_1.STATUS_MSG.ERROR.NOT_EXIST(username).message);
        }
        else {
            if (user.status === constant_1.DBENUMS.STATUS[0]) {
                user = yield users_model_1.default.findOneAndUpdate({ username: username }, { status: constant_1.DBENUMS.STATUS[1], updatedAt: new Date().getTime() }, { new: true });
                if (!user) {
                    throw new Error(constant_1.STATUS_MSG.ERROR.NOT_EXIST(username).message);
                }
                else {
                    res.status(constant_1.STATUS_MSG.SUCCESS.UPDATED.statusCode).json(constant_1.STATUS_MSG.SUCCESS.UPDATED);
                }
            }
            else {
                res.status(constant_1.STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(constant_1.STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('User status is already INACTIVE'));
            }
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deactivateUser = deactivateUser;
const reactivateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        let user = yield users_model_1.default.findOne({ username: username });
        if (!user) {
            throw new Error(constant_1.STATUS_MSG.ERROR.NOT_EXIST(username).message);
        }
        else {
            if (user.status === constant_1.DBENUMS.STATUS[1]) {
                user = yield users_model_1.default.findOneAndUpdate({ username: username }, { status: constant_1.DBENUMS.STATUS[0], updatedAt: new Date().getTime() }, { new: true });
                if (!user)
                    throw new Error(constant_1.STATUS_MSG.ERROR.NOT_EXIST(username).message);
                else
                    res.status(constant_1.STATUS_MSG.SUCCESS.UPDATED.statusCode).json(constant_1.STATUS_MSG.SUCCESS.UPDATED);
            }
            else {
                res.status(constant_1.STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(constant_1.STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('User status is already ACTIVE'));
            }
        }
    }
    catch (err) {
        next(err);
    }
});
exports.reactivateUser = reactivateUser;
const sendMsg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            res.status(401).json(constant_1.STATUS_MSG.SUCCESS.DEFAULT);
        }
    }
    catch (err) {
        res.status(400).json(constant_1.STATUS_MSG.ERROR.BAD_REQUEST);
    }
});
exports.sendMsg = sendMsg;
