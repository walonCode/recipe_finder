"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.route('/login').post(user_controller_1.login);
exports.userRouter.route('/register').post(user_controller_1.register);
