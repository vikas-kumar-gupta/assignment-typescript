"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../middlewares/user");
const user_2 = require("../controllers/user");
const router = express_1.default.Router();
router.post('/login', user_1.isLoggedIn, user_2.logIn);
router.post('/signup', user_2.signUp);
router.get('/user/all', user_2.getAllUsers);
router.post('/reactivate', () => { });
router.get('/user/:username', user_2.userDetail);
router.patch('/user/:username/edit', user_2.updateUser);
router.delete('/user/:username/delete', user_2.deleteUser);
exports.default = router;
