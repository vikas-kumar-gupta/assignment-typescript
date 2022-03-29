import express, {Request, Response} from 'express';

import {isLoggedIn, auth} from '../middlewares/user'
import {signUp, logIn, deleteUser, userDetail, getAllUsers, updateUser, sendMsg } from '../controllers/user'


const router = express.Router();

router.post('/login', isLoggedIn, logIn)
router.post('/signup', signUp)
router.get('/user/all', getAllUsers)
router.get('/user/:username', auth, userDetail)
router.post('/send-msg', sendMsg)
router.patch('/user/:username/edit', auth, updateUser)
router.delete('/user/:username/delete', auth, deleteUser)

export default router;