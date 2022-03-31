import {STATUS_MSG} from '../../constant'
import express, { Request, Response } from 'express';

export const landingPage = async (req: Request, res: Response) => {
    res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(STATUS_MSG.SUCCESS.DEFAULT);
}

export const pageNotFond = async (req: Request, res: Response) => {
    res.status(STATUS_MSG.ERROR.PAGE_NOT_FOUND.statusCode).json(STATUS_MSG.ERROR.PAGE_NOT_FOUND);
}
