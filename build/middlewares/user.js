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
exports.isAuthored = exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (token != undefined) {
            const varifyToken = jsonwebtoken_1.default.verify(token, "satyamev-jayte");
            next();
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ error: true, message: "err" });
    }
});
exports.isLoggedIn = isLoggedIn;
const isAuthored = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jsonwebtoken_1.default.verify(token, "satyamev-jayte");
        next();
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
});
exports.isAuthored = isAuthored;
