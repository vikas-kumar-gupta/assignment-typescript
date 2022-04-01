import express, {Request, Response, NextFunction} from 'express';

export const handleError = (err: Error, req: Request, res: Response) => {
    console.log(err)
    console.log('hghghghghhg');
    ;
    
    // res.status(err.statusCode).json(err.message)
}