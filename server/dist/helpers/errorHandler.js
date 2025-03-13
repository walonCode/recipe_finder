"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (res, statusCode, message, error) => {
    if (error) {
        console.error(error);
    }
    return res.status(statusCode).json({
        success: false,
        message
    });
};
exports.errorHandler = errorHandler;
