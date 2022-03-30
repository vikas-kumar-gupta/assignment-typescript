import express, { Request, Response } from 'express';
import { isLoggedIn, auth } from '../middlewares/user'
import { signUp, logIn, deleteUser, userDetail, getAllUsers, updateUser, sendMsg } from '../controllers/user'


const router = express.Router();

/**
 * @swagger
 * /:login
 *  post:
 *      summary: This is user login route
 *      description: This is user login
 *      responses:
 *          200:
 *              description: to test post method
 */

router.post('/login', isLoggedIn, logIn)
router.post('/signup', signUp)
router.get('/user/all', getAllUsers)
router.get('/user/:username', auth, userDetail)
router.post('/send-msg', sendMsg)
router.patch('/user/:username/edit', auth, updateUser)
router.delete('/user/:username/delete', auth, deleteUser)

export default router;