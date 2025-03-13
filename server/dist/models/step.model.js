"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stepsSchema = new mongoose_1.Schema({
    foodId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    step: [{
            type: String,
            required: true
        }],
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
const Step = (0, mongoose_1.model)('step', stepsSchema);
exports.default = Step;
