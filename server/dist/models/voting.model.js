"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const votingSchema = new mongoose_1.Schema({
    foodId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    votesType: {
        type: String,
        enum: ["like", "dislike"],
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Voting = (0, mongoose_1.model)('voting', votingSchema);
exports.default = Voting;
