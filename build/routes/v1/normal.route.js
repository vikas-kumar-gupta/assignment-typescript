"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/index");
const router = express_1.default.Router();
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
router.get('/', index_1.normalController.landingPage);
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
router.get('/*', index_1.normalController.pathNotFond);
exports.default = router;
