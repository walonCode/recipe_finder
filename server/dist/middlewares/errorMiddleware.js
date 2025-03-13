"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorHandler_1 = require("../helpers/errorHandler");
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    (0, errorHandler_1.errorHandler)(res, 500, "Internal Server Error", err);
    next();
};
exports.errorMiddleware = errorMiddleware;
