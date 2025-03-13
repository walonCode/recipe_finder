"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStepSchema = void 0;
const zod_1 = require("zod");
exports.createStepSchema = zod_1.z.object({
    foodId: zod_1.z.string().min(5, "Food id must be at least 5 characters"),
    step: zod_1.z.array(zod_1.z.string()).min(1, "Step must be at least 1 step"),
});
