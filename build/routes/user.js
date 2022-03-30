"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../middlewares/user");
const user_2 = require("../controllers/user");
const router = express_1.default.Router();
/**
 * @swagger
 * /login:
 *  post:
 *      summary: user log-in
 *      description: user login with parameter username and pasdsword
 *      responses:
 *          200:
 *              description: rigth  credentials
 *          401:
 *              description: Unauthorized access
 */
router.post('/login', user_1.isLoggedIn, user_2.logIn);
/**
 * @swagger
 * /signup:
 *  post:
 *      summary: use signup
 *      description: user signup with parameter username, pasdsword and email
 *      responses:
 *          200:
 *              description: created new user account
 */
router.post('/signup', user_2.signUp);
/**
 * @swagger
 * /user/all-users:
 *  get:
 *      summary: All user details
 *      description: list all the users data
 *      responses:
 *          200:
 *              description: created new user account
 */
router.get('/user/all-users', user_2.getAllUsers);
/**
 * @swagger
 * /user/:username:
 *  get:
 *      summary: user details
 *      description: All the data about a perticular username
 *      responses:
 *          200:
 *              description: created new user account
 *          400:
 *              description: user doesn't exist
 */
router.get('/user/:username', user_1.auth, user_2.userDetail);
router.post('/send-msg', user_2.sendMsg);
/**
 * @swagger
 * /user/:username/edit:
 *  patch:
 *      summary: edit user data
 *      description: edit the data of an user of given username
 *      responses:
 *          200:
 *              description: created new user account
 *          400:
 *              description: user doesn't exist
 */
router.patch('/user/:username/edit', user_1.auth, user_2.updateUser);
/**
 * @swagger
 * /user/:username/delete:
 *  delete:
 *      summary: delete user
 *      description: delete the existing data of user of given username
 *      responses:
 *          200:
 *              description: created new user account
 *          400:
 *              description: user doesn't exist
 */
router.delete('/user/:username/delete', user_1.auth, user_2.deleteUser);
exports.default = router;
