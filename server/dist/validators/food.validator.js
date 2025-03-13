"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFoodSchema = exports.createFoodSchema = void 0;
const zod_1 = require("zod");
exports.createFoodSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    origin: zod_1.z.string().min(2, "Origin must be at least 2 characters"),
    ingredient: zod_1.z.array(zod_1.z.string()).min(1, "Please provide at least one ingredients"),
    username: zod_1.z.string().min(2, "username should be at least two characters").optional()
});
exports.updateFoodSchema = zod_1.z.object({
    name: zod_1.z.string().min(5, "Name must be at least 5 characters").optional(),
    origin: zod_1.z.string().min(5, "Origin must be at least 5 characters").optional(),
    ingredient: zod_1.z.array(zod_1.z.string()).min(1, "Please provide at least one ingredients").optional(),
});
