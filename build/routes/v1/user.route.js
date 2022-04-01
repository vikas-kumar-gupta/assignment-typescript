"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = require("../../middlewares/user.middleware");
const index_1 = require("../../controllers/index");
const router = express_1.default.Router();
// CREATING TAGS
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Routes
 */
// CREATING SCHEMA
/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *                  email:
 *                      type: string
 *                      required: true
 *                  status:
 *                      type: string
 *                      required: false
 *                  createdAt:
 *                      type: date
 *                      required: false
 *                  updatedAt:
 *                      type: date
 *                      required: false
 */
/**
 * @swagger
 * /v1/login:
 *  post:
 *      summary: user log-in
 *      tags: [User]
 *      description: user login with parameter username and pasdsword
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              required: true
 *                          password:
 *                              type: string
 *                              required: true
 *      responses:
 *          200:
 *              description: Sucess
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */
router.post('/login', user_middleware_1.isLoggedIn, index_1.userController.logIn);
/**
 * @swagger
 * /v1/signup:
 *  post:
 *      tags: [User]
 *      summary: use signup
 *      description: user signup with parameter username, pasdsword and email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              required: true
 *                          email:
 *                              type: string
 *                              required: true
 *                          password:
 *                              type: string
 *                              required: true
 *      responses:
 *          200:
 *              description: Sucessfully created
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal server error
 */
router.post('/signup', index_1.userController.signUp);
/**
 * @swagger
 * /v1/user/all-users:
 *  get:
 *      tags: [User]
 *      summary: All user details
 *      description: list all the users data
 *      responses:
 *          200:
 *              description: Sucess
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal server error
 */
router.get('/user/all-users', index_1.userController.getAllUsers);
/**
 * @swagger
 * /v1/user/{username}:
 *  get:
 *      tags: [User]
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
 *              description: Sucess
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */
router.get('/user/:username', user_middleware_1.auth, index_1.userController.userDetail);
router.post('/send-msg', index_1.userController.sendMsg);
/**
 * @swagger
 * /v1/user/{username}/edit:
 *  patch:
 *      tags: [User]
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
 *                      properties:
 *                          username:
 *                              type: string
 *                              required: false
 *                          password:
 *                              type: string
 *                              required: false
 *                          email:
 *                              type: string
 *                              required: false
 *                          status:
 *                              type: string
 *                              required: false
 *      responses:
 *          200:
 *              description: Sucessfully edited
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 */
router.patch('/user/:username/edit', user_middleware_1.auth, index_1.userController.updateUser);
/**
 * @swagger
 * /v1/user/{username}/deactivate:
 *  patch:
 *      tags: [User]
 *      summary: deactivate user
 *      description: deactivate the account of user of given username
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            description: String username required
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Account deactivate success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */
router.patch('/user/:username/deactivate', user_middleware_1.auth, index_1.userController.deactivateUser);
/**
 * @swagger
 * /v1/user/{username}/reactivate:
 *  patch:
 *      tags: [User]
 *      summary: reactivate user
 *      description: rreactivate the account of user of given username
 *      parameters:
 *          - in: path
 *            name: username
 *            required: true
 *            description: String username required
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Account activation success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */
router.patch('/user/:username/reactivate', user_middleware_1.auth, index_1.userController.reactivateUser);
/**
 * @swagger
 * /v1/user/{username}/delete:
 *  delete:
 *      tags: [User]
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
 *              description: Deletion sucess
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */
router.delete('/user/:username/delete', user_middleware_1.auth, index_1.userController.deleteUser);
exports.default = router;
