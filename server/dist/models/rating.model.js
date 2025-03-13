"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    foodId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
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
const Rating = mongoose_1.models.rating || (0, mongoose_1.model)('rating', ratingSchema);
exports.default = Rating;
