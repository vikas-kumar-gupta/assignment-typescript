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
const mqtt = require('async-mqtt');
const users_1 = __importDefault(require("../models/users"));
function emmmmmit(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, message } = options;
        try {
            const user = yield users_1.default.findOne(options);
            if (user) {
                const client = mqtt.connect("http://localhost:5000", { username: username, password: password });
                client.on('connect', () => {
                    client.publish('topic-123', message);
                    return 1;
                });
            }
            else {
                console.log("User does not exists");
            }
        }
        catch (err) {
            console.log(err.message);
            return 0;
        }
    });
}
exports.default = emmmmmit;
