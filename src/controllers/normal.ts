import express, { Request, Response } from 'express';

const landingPage = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the landing page" })
}

const pathNotFond = async (req: Request, res: Response) => {
    res.status(404).json({ message: "Path Not Found" });
}

export {landingPage, pathNotFond}