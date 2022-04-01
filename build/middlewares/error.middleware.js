"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (err, req, res) => {
    console.log(err);
    console.log('hghghghghhg');
    ;
    // res.status(err.statusCode).json(err.message)
};
exports.handleError = handleError;
