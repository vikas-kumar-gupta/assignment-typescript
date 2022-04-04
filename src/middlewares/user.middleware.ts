import express, { Application, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (token != undefined) {
            const varifyToken = jwt.verify(token, "satyamev-jayte", (err: any, data: any) => {
                req.body.tokenId = data._id;
            })
            next()
        }
        else {
            next()
        }
    }
    catch (err) {
        console.log(err);

        res.status(404).json({ error: true, message: "err" });
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, "satyamev-jayte", (err: any, data: any) => {
            req.body.tokenId = data._id;
        })
        next()
    }
    catch (err) {
        res.status(404).json({ error: true, message: err })
    }
}

export { isLoggedIn, auth }