import express, { Request, Response } from 'express';
import User from '../models/users'

const signUp = async (req: Request, res: Response) => {
    try {
        const data: JSON = req.body;
        const user = new User(data);
        await user.save(err => {
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
        const user = await User.find({ username: username, password: password })
        if (user.length != 0) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "incorrect username or password" })
        }
    }
    catch (err) {
        res.status(400).json({ error: true, message: err });
    }
}

const userDetail = async (req: Request, res: Response) => {
    try {
        const username = req.body.username
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
                res.status(200).json({ message: "user deleted successfully", user: data })
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
        User.findOneAndUpdate({ username: username }, { password: password, email: email, status: status }, null, (err, data) => {
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