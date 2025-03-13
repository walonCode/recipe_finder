"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    ingredient: {
        type: [String],
        required: true
    },
    steps: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Step"
        }],
    votes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Voting"
        }],
    ratings: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Rating"
        }],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Food = (0, mongoose_1.model)('food', foodSchema);
exports.default = Food;
