import express, { Application, Request, Response } from 'express';
import mqtt from 'mqtt';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

const app: Application = express();

import User from '../../models/users.model'

/**
 * @description this method will recieve the username, password and email from the body
 */

export const signUp = async (req: Request, res: Response) => {
    try {
        const { username, password, email, status }: any = req.body;
        const hashPassword = md5(password);
        const userExists = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if (!userExists) {
            const createdAt: Number = new Date().getTime()
            const query = { username: username, password: hashPassword, email: email, status: status, createdAt: createdAt }
            const user = new User(query);
            const token: any = jwt.sign({ _id: user._id }, "satyamev-jayte")
            res.cookie('jwt', token, { expires: new Date(Date.now() + 600000) })
            user.save(err => {
                if (err) {
                    res.status(404).json({ error: true, message: err.message });
                }
                else {
                    res.status(201).json({ message: "data updated successfully" })
                }
            })
        }
        else {
            res.status(404).json({ message: "email or username is already registered" });
        }

    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
}

/**
 * @description this method will recieve the username and password from the body
 */
export const logIn = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashPassword = md5(password)
        const user: any = await User.findOne({ username: username, password: hashPassword })
        const token = req.cookies.jwt;
        if (token == undefined && user) {
            const newToken = jwt.sign({ _id: user._id }, "satyamev-jayte")
            res.cookie('jwt', newToken, { expires: new Date(Date.now() + 600000) })
            if (user) {
                res.status(200).json({ message: "login successful", user: user })
            }
            else {
                res.status(401).json({ message: "incorrect username or password" })
            }
        }
        else {
            if (user) {
                res.status(200).json({ message: "already logged in" });
            }
            else {
                res.status(401).json({ message: "incorrect username or password" })
            }
        }

    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
}

/**
 * @description receives the user data from body to be updated
 */
export const userDetail = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(401).json({ message: "could not find user" })
        }
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
}


/**
 * @description displays all the user 
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.status(200).json({ numberOfUsers: user.length, usersData: user });
    }
    catch (err) {
        res.status(404).json({ error: true, message: err });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const user = User.findOneAndDelete({ username: username }, (err: Error, data: User) => {
            if (err) {
                res.status(404).json({ error: true, message: err })
            }
            else {
                if (data) {
                    res.status(200).json({ message: "user deleted successfully", user: data })
                }
                else {
                    res.status(401).json({ message: "user does not exist" })
                }
            }
        })
    }
    catch (err) {
        res.status(404).json({ error: true, message: err })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const username: String = req.params.username;
        const { password, email, status } = req.body;
        const hashPassword = md5(password)
        const updatedAt: Number = new Date().getTime();
        User.findOneAndUpdate({ username: username }, { password: hashPassword, email: email, status: status, updatedAt: updatedAt }, null, (err, data) => {
            if (err) {
                res.status(401).json({ error: true, message: err })
            }
            else {
                res.status(201).json({ message: "user updated successfully.", user: data })
            }
        });
    }
    catch (err) {
        res.status(404).json({ error: true, message: err })
    }
}

export const sendMsg = async (req: Request, res: Response) => {
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
            res.status(401).json({ message: 'toekn is not verified' })
        }
    }
    catch (err) {
        res.status(404).json({ error: true, message: err })
    }
}

// export { signUp, logIn, deleteUser, getAllUsers, userDetail, updateUser, sendMsg }