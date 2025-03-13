"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRatingSchema = void 0;
const zod_1 = require("zod");
exports.createRatingSchema = zod_1.z.object({
    foodId: zod_1.z.string().min(5, "Food id must be at least 5 characters"),
    rating: zod_1.z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});
