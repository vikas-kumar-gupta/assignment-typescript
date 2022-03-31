"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../middlewares/user");
const index_1 = require("../../controllers/index");
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
 * /v1/login:
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
router.post('/login', user_1.isLoggedIn, index_1.userController.logIn);
/**
 * @swagger
 * /v1/signup:
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
router.post('/signup', index_1.userController.signUp);
/**
 * @swagger
 * /v1/user/all-users:
 *  get:
 *      summary: All user details
 *      description: list all the users data
 *      responses:
 *          200:
 *              description: created new user account
 */
router.get('/user/all-users', index_1.userController.getAllUsers);
/**
 * @swagger
 * /v1/user/{username}:
 *  get:
 *      summary: user details
 *      description: All the data about a perticular username
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            description: string username required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: all the data about a perticular username
 *          400:
 *              description: user doesn't exist
 */
router.get('/user/:username', user_1.auth, index_1.userController.userDetail);
router.post('/send-msg', index_1.userController.sendMsg);
/**
 * @swagger
 * /v1/user/{username}/edit:
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
router.patch('/user/:username/edit', user_1.auth, index_1.userController.updateUser);
/**
 * @swagger
 * /v1/user/{username}/delete:
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
router.delete('/user/:username/delete', user_1.auth, index_1.userController.deleteUser);
exports.default = router;
