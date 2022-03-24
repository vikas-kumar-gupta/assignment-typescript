import express, { Application, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (token != undefined) {
            const varifyToken = jwt.verify(token, "satyamev-jayte")
            next()
        }
        else {
            next()
        }
    }
    catch (err) {
        console.log(err);
        
        res.status(400).json({ error: true, message: "err" });
    }
}

export { isLoggedIn }