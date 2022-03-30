import express, {Request, Response} from 'express';
import {landingPage, pathNotFond} from '../controllers/normal.controller'

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      summary: landing page
 *      description: landing page of the project
 *      responses:
 *          200:
 *              description: nothing to show
 */
router.get('/', landingPage)

/**
 * @swagger
 * /*:
 *  get:
 *      summary: 404 not found
 *      description: all the undefined paths will be routed here to show 404 error
 *      responses:
 *          400:
 *              description: path does not exist
 */
router.get('/*', pathNotFond)

export default router;