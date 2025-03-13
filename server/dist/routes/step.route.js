"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const step_controller_1 = require("../controllers/step.controller");
exports.stepRouter = (0, express_1.Router)();
exports.stepRouter.route('/').post(authMiddleware_1.authMiddleware, step_controller_1.createStep).get(step_controller_1.getAllSteps);
exports.stepRouter.route('/:id').delete(step_controller_1.deleteStep);
