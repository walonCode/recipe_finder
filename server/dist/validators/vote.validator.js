"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVoteSchema = void 0;
const zod_1 = require("zod");
exports.createVoteSchema = zod_1.z.object({
    foodId: zod_1.z.string().min(5, "Food id must be at least 5 characters"),
    voteType: zod_1.z.enum(["like", "dislike"]),
});
