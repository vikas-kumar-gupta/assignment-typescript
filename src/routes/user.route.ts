import express, { Request, Response } from 'express';
import { isLoggedIn, auth } from '../middlewares/user'
import { signUp, logIn, deleteUser, userDetail, getAllUsers, updateUser, sendMsg } from '../controllers/user.controller'


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
router.post('/login', isLoggedIn, logIn)

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
router.post('/signup', signUp)

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
router.get('/user/all-users', getAllUsers)

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
router.get('/user/:username', auth, userDetail)
router.post('/send-msg', sendMsg)

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
 *      responses:
 *          200:
 *              description: created new user account
 *          400:
 *              description: user doesn't exist 
 */
router.patch('/user/:username/edit', auth, updateUser)

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
 *              description: created new user account
 *          400:
 *              description: user doesn't exist 
 */
router.delete('/user/:username/delete', auth, deleteUser)

export default router;