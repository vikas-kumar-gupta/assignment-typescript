"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/index");
const router = express_1.default.Router();
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
router.get('/', index_1.normalController.landingPage);
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
router.get('/*', index_1.normalController.pageNotFond);
exports.default = router;
