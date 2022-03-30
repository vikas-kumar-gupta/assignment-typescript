"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../middlewares/user");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *                  email:
 *                      type: string
 *                  status:
 *                      type: string
 *                  createdAt:
 *                      type: date
 *                  updatedAt:
 *                      type: date
 */
/**
 * @swagger
 * /login:
 *  post:
 *      summary: user log-in
 *      description: user login with parameter username and pasdsword
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          #ref: '#components/shemas/User'
 *      responses:
 *          200:
 *              description: rigth  credentials
 *          401:
 *              description: Unauthorized access
 */
router.post('/login', user_1.isLoggedIn, user_controller_1.logIn);
/**
 * @swagger
 * /signup:
 *  post:
 *      summary: use signup
 *      description: user signup with parameter username, pasdsword and email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          #ref: '#components/shemas/User'
 *      responses:
 *          200:
 *              description: created new user account
 *          400:
 *              description: email or username is already registered
 */
router.post('/signup', user_controller_1.signUp);
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
router.get('/user/all-users', user_controller_1.getAllUsers);
/**
 * @swagger
 * /user/{username}:
 *  get:
 *      summary: user details
 *      description: All the data about a perticular username
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            description: String username required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: all the data about a perticular username
 *          400:
 *              description: user doesn't exist
 */
router.get('/user/:username', user_1.auth, user_controller_1.userDetail);
router.post('/send-msg', user_controller_1.sendMsg);
/**
 * @swagger
 * /user/{username}/edit:
 *  patch:
 *      summary: edit user data
 *      description: edit the data of an user of given username
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            description: String username required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          #ref: '#components/shemas/User'
 *      responses:
 *          200:
 *              description: created new user account
 *          400:
 *              description: user doesn't exist
 */
router.patch('/user/:username/edit', user_1.auth, user_controller_1.updateUser);
/**
 * @swagger
 * /user/{username}/delete:
 *  delete:
 *      summary: delete user
 *      description: delete the existing data of user of given username
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            description: String username required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: user deleted
 *          400:
 *              description: user doesn't exist
 */
router.delete('/user/:username/delete', user_1.auth, user_controller_1.deleteUser);
exports.default = router;
