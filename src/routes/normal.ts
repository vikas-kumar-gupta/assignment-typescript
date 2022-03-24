import express, {Request, Response} from 'express';
import {landingPage, pathNotFond} from '../controllers/normal'

const router = express.Router();

router.get('/', landingPage)
router.get('/*', pathNotFond)

export default router;