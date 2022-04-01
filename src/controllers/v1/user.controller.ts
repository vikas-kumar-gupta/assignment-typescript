import { STATUS_MSG, DBENUMS } from '../../constant'
import express, { Application, Request, Response, NextFunction } from 'express';
import mqtt from 'mqtt';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

const app: Application = express();

import User from '../../models/users.model'
import { IUser } from '../../interfaces/model.interface'
import { handleError } from '../../middlewares/error.middleware'
import * as validate from '../../utils/validator'

/**
 * @description this method will recieve the username, password and email from the body
 */
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, email } = req.body;

        // validating the user inputs
        await validate.userSignup.validateAsync(req.body);   

        // check wheather user or email addresss already registred
        const isUserExists = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if (!isUserExists) {
            const hashPassword = md5(password);
            const query = { username: username, password: hashPassword, email: email, createdAt: new Date().getTime() }
            const user = new User(query);
            const token: any = jwt.sign({ _id: user._id }, "satyamev-jayte")
            res.cookie('jwt', token, { expires: new Date(Date.now() + 600000) })
            user.save(err => {
                if (err) {                    
                    throw new Error(STATUS_MSG.ERROR.BAD_REQUEST.message)
                }
                else {
                    res.status(201).json(STATUS_MSG.SUCCESS.CREATED)
                }
            })
        }
        else {
            res.status(400).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('email or username is already registered'));
        }
    }
    catch (err: any) {
        if (err.isJoi === true) {
            err.status = 422
        }
        // next(err)
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST);
    }
}

/**
 * @description this method will recieve the username and password from the body
 */
export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        await validate.userLogIn.validateAsync(req.body)
        const hashPassword = md5(password)
        const user: any = await User.findOne({ username: username, password: hashPassword })
        const token = req.cookies.jwt;
        if (token == undefined && user) {
            // res.clearCookie('jwt');
            const newToken = jwt.sign({ _id: user._id }, "satyamev-jayte");
            console.log(newToken);
            
            res.cookie('jwt', newToken, { expires: new Date(Date.now() + 600000) })
            if (user) {
                res.status(200).json(STATUS_MSG.SUCCESS.DEFAULT)
            }
            else {
                res.status(400).json(STATUS_MSG.ERROR.INCORRECT_CREDENTIALS)
            }
        }
        else {
            if (user) {
                res.status(200).json(STATUS_MSG.ERROR.TOKEN_ALREADY_EXIST);
            }
            else {
                res.status(400).json(STATUS_MSG.ERROR.INCORRECT_CREDENTIALS)
            }
        }

    }
    catch (err: any) {
        if (err.isJoi) {
            err.status = 422
        }
        next(err)
    }
}

/**
 * @description receives the user data from body to be updated
 */
export const userDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(400).json(STATUS_MSG.ERROR.NOT_EXIST(username))
        }
    }
    catch (err) {
        res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST);
    }
}

/**
 * @description displays all the user 
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find();
        if (!user) {
            res.status(STATUS_MSG.SUCCESS.EMPTY_RECORD.statusCode).json(STATUS_MSG.SUCCESS.EMPTY_RECORD)
        }
        res.status(200).json(user);
    }
    catch (err) {
        // next(err);
        res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = User.findOneAndDelete({ username: username }, (err: Error, data: IUser) => {
            if (err) {
                throw err;
            }
            else {
                if (data) {
                    res.status(200).json(STATUS_MSG.SUCCESS.DELETED)
                }
                else {
                    res.status(400).json(STATUS_MSG.ERROR.NOT_EXIST(username))
                }
            }
        })
    }
    catch (err) {
        res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username: String = req.params.username;
        const { password, email, status } = req.body;
        await validate.userUpdate.validateAsync(req.body)
        const hashPassword = md5(password)
        const updatedAt: Number = new Date().getTime();
        User.findOneAndUpdate({ username: username }, { password: hashPassword, email: email, status: status, updatedAt: updatedAt }, null, (err, data) => {
            if (err) {
                res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST)
            }
            else {
                res.status(200).json(STATUS_MSG.SUCCESS.UPDATED)
            }
        });
    }
    catch (err: any) {
        if (err.isJoi) {
            err.status = 422
        }
        res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username: string = req.params.username;
        let user = await User.findOne({ username: username });
        if (!user) {
            throw new Error(STATUS_MSG.ERROR.NOT_EXIST(username).message)
        } else {
            if (user.status === DBENUMS.STATUS[0]) {
                user = await User.findOneAndUpdate({ username: username }, { status: DBENUMS.STATUS[1], updatedAt: new Date().getTime() }, { new: true })
                if (!user) {
                    throw new Error(STATUS_MSG.ERROR.NOT_EXIST(username).message)
                }
                else {
                    res.status(STATUS_MSG.SUCCESS.UPDATED.statusCode).json(STATUS_MSG.SUCCESS.UPDATED)
                }
            }
            else {
                res.status(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('User status is already INACTIVE'))
            }
        }
    }
    catch (err) {
        next(err)
    }
}

export const reactivateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        let user = await User.findOne({ username: username })
        if (!user) {
            throw new Error(STATUS_MSG.ERROR.NOT_EXIST(username).message)
        } else {
            if (user.status === DBENUMS.STATUS[1]) {
                user = await User.findOneAndUpdate({ username: username }, { status: DBENUMS.STATUS[0], updatedAt: new Date().getTime() }, { new: true })
                if (!user)
                    throw new Error(STATUS_MSG.ERROR.NOT_EXIST(username).message)
                else
                    res.status(STATUS_MSG.SUCCESS.UPDATED.statusCode).json(STATUS_MSG.SUCCESS.UPDATED)
            } else {
                res.status(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('User status is already ACTIVE'))
            }
        }
    }
    catch (err) {
        next(err)
    }
}

export const sendMsg = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (token != undefined || null) {
            const varifyToken = jwt.verify(token, 'satyamev-jayte')
            console.log('token verified');
            const client = mqtt.connect("mqtt://localhost:3050");
            const { message } = req.body;
            const topic_Appinventiv = "Appinventiv"

            let msg_Appinventiv = `Hello Appinventiv`;

            client.on('connect', () => {
                client.publish(topic_Appinventiv, message);
                console.log(`msg sent: ${message}`);
                res.status(200).json({ message: 'message sent successfully' })
            })
        }
        else {
            res.status(401).json(STATUS_MSG.SUCCESS.DEFAULT)
        }
    }
    catch (err) {
        res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}