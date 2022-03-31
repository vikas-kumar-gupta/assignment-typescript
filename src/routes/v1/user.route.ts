import express, { Request, Response } from 'express';

import { isLoggedIn, auth } from '../../middlewares/user';
import {userController} from '../../controllers/index'

const router = express.Router();

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
router.post('/login', isLoggedIn, userController.logIn)

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
router.post('/signup', userController.signUp)

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
router.get('/user/all-users', userController.getAllUsers)

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
router.get('/user/:username', auth, userController.userDetail)
router.post('/send-msg', userController.sendMsg)

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
router.patch('/user/:username/edit', auth, userController.updateUser)

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
router.delete('/user/:username/delete', auth, userController.deleteUser)

export default router;