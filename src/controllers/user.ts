import express, { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

const app: Application = express();

import User from '../models/users'

const signUp = async (req: Request, res: Response) => {
    try {
        const { username, password, email, status }: any = req.body;
        const hashPassword = md5(password);
        const query = { username: username, password: hashPassword, email: email, status: status }
        const user = new User(query);
        const token: any = jwt.sign({ _id: user._id }, "satyamev-jayte")
        res.cookie('jwt', token, { expires: new Date(Date.now() + 600000) })
        user.save(err => {
            if (err) {
                res.status(400).json({ error: true, message: err.message });
            }
            else {
                res.status(200).json({ message: "data updated successfully" })
            }
        })
    }
    catch (err) {
        res.status(400).json({ error: true, message: err });
    }
}

const logIn = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashPassword = md5(password)
        const user: any = await User.findOne({ username: username, password: hashPassword })
        const token = req.cookies.jwt;
        if (token == undefined && user) {
            const newToken = jwt.sign({ _id: user._id }, "satyamev-jayte")
            res.cookie('jwt', newToken, { expires: new Date(Date.now() + 600000) })
            if (user) {
                res.status(200).json({message: "login successful", user: user})
            }
            else {
                res.status(400).json({ message: "incorrect username or password" })
            }
        }
        else {
            if(user) {
                res.status(200).json({message:"already logged in"});
            }
            else {
                res.status(400).json({ message: "incorrect username or password" })
            }
        }
        
    }
    catch (err) {
        res.status(400).json({ error: true, message: err });
    }
}

const userDetail = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(400).json({ message: "could not find user" })
        }
    }
    catch (err) {
        res.status(400).json({ error: true, message: err });
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.status(200).json({ numberOfUsers: user.length });
    }
    catch (err) {
        res.status(400).json({ error: true, message: err });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const user = User.findOneAndDelete({ username: username }, (err: Error, data: User) => {
            if (err) {
                res.status(400).json({ error: true, message: err })
            }
            else {
                if(data) {
                    res.status(200).json({ message: "user deleted successfully", user: data })
                }
                else {
                    res.status(404).json({ message: "user does not exist" })
                }
            }
        })
    }
    catch (err) {
        res.status(400).json({ error: true, message: err })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const username: String = req.params.username;
        const { password, email, status } = req.body;
        const hashPassword = md5(password)
        User.findOneAndUpdate({ username: username }, { password: hashPassword, email: email, status: status }, null, (err, data) => {
            if (err) {
                res.status(400).json({ error: true, message: err })
            }
            else {
                res.status(200).json({ message: "user updated successfully.", user: data })
            }
        });
    }
    catch (err) {
        res.status(400).json({ error: true, message: err })
    }
}

export { signUp, logIn, deleteUser, getAllUsers, userDetail, updateUser }