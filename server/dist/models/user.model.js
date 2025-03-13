"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    food: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Food'
        }],
    ratings: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Rating'
        }],
    votes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Voting'
        }]
}, { timestamps: true });
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
