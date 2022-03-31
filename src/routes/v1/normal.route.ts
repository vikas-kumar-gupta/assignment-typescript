import express, {Request, Response} from 'express';

import {normalController} from '../../controllers/index'

const router = express.Router();

/**
 * @swagger
 * /v1/:
 *  get:
 *      summary: landing page
 *      description: landing page of the project
 *      responses:
 *          200:
 *              description: nothing to show
 */
router.get('/', normalController.landingPage)

/**
 * @swagger
 * /v1/*:
 *  get:
 *      summary: 404 not found
 *      description: all the undefined paths will be routed here to show 404 error
 *      responses:
 *          400:
 *              description: path does not exist
 */
router.get('/*', normalController.pathNotFond)

export default router;