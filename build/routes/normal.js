"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const normal_1 = require("../controllers/normal");
const router = express_1.default.Router();
router.get('/', normal_1.landingPage);
router.get('/*', normal_1.pathNotFond);
exports.default = router;
