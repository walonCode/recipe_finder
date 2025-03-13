"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../helpers/errorHandler");
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        (0, errorHandler_1.errorHandler)(res, 401, 'Access denied', "token not found");
        return;
    }
    const tokenValue = token.replace('Bearer ', '').trim();
    try {
        const decoded = jsonwebtoken_1.default.verify(tokenValue, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        (0, errorHandler_1.errorHandler)(res, 401, 'Unauthorized', "invalid token");
        return;
    }
};
exports.authMiddleware = authMiddleware;
