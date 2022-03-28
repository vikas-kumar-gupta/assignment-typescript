import express, {Request, Response} from 'express';

import {isLoggedIn, isAuthored} from '../middlewares/user'
import {signUp, logIn, deleteUser, userDetail, getAllUsers, updateUser, sendMsg } from '../controllers/user'


const router = express.Router();

router.post('/login', isLoggedIn, logIn)
router.post('/signup', signUp)
router.get('/user/all', getAllUsers)
router.get('/user/:username', isAuthored, userDetail)
router.post('/send-msg', sendMsg)
router.patch('/user/:username/edit', isAuthored, updateUser)
router.delete('/user/:username/delete', isAuthored, deleteUser)

export default router;