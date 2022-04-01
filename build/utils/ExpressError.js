"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressError = void 0;
class ExpressError extends Error {
    constructor(err) {
        super();
        // this.message = message;
        // this.status = status;
    }
}
exports.ExpressError = ExpressError;
