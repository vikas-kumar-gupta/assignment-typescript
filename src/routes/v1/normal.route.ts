import express, {Request, Response} from 'express';

import {normalController} from '../../controllers/index'

const router = express.Router();

// CREATING TAGS

/**
 * @swagger
 * tags:
 *  name: Default
 *  description: Default Routes
 */

/**
 * @swagger
 * /v1/:
 *  get:
 *      tags: [Default]
 *      summary: landing page
 *      description: landing page of the project
 *      responses:
 *          200:
 *              description: Sucess
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 */
router.get('/', normalController.landingPage)

/**
 * @swagger
 * /v1/*:
 *  get:
 *      tags: [Default]
 *      summary: page not found
 *      description: all the undefined paths will be routed here to show PAGE_NOT_FOUND
 *      responses:
 *          200:
 *              description: Sucess
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 */
router.get('/*', normalController.pageNotFond)

export default router;