import express, {Request, Response} from 'express';
import {signUp, logIn, deleteUser, userDetail, getAllUsers, updateUser } from '../controllers/user'

const router = express.Router();

router.post('/login', logIn)
router.post('/signup', signUp)
router.get('/user/all', getAllUsers)
router.post('/reactivate', ()=>{})
router.get('/user/:username', userDetail)
router.patch('/user/:username/edit', updateUser)
router.delete('/user/:username/delete', deleteUser)

export default router;