"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFond = exports.landingPage = void 0;
const constant_1 = require("../../constant");
const landingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(constant_1.STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(constant_1.STATUS_MSG.SUCCESS.DEFAULT);
});
exports.landingPage = landingPage;
const pageNotFond = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(constant_1.STATUS_MSG.ERROR.PAGE_NOT_FOUND.statusCode).json(constant_1.STATUS_MSG.ERROR.PAGE_NOT_FOUND);
});
exports.pageNotFond = pageNotFond;
