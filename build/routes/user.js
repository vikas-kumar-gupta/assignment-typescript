"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post('/login', user_1.logIn);
router.post('/signup', user_1.signUp);
router.get('/user/all', user_1.getAllUsers);
router.post('/reactivate', () => { });
router.get('/user/:username', user_1.userDetail);
router.patch('/user/:username/edit', user_1.updateUser);
router.delete('/user/:username/delete', user_1.deleteUser);
exports.default = router;
