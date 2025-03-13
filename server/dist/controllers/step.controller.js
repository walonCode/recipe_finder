"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSteps = exports.deleteStep = exports.createStep = void 0;
const apiResponse_1 = require("../helpers/apiResponse");
const errorHandler_1 = require("../helpers/errorHandler");
const asyncHandler_1 = require("../helpers/asyncHandler");
const step_model_1 = __importDefault(require("../models/step.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const food_model_1 = __importDefault(require("../models/food.model"));
const step_validator_1 = require("../validators/step.validator");
exports.createStep = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = step_validator_1.createStepSchema.safeParse(req.body);
    if (!result.success) {
        return (0, errorHandler_1.errorHandler)(res, 400, "Bad request", result.error);
    }
    const { foodId, step } = result.data;
    const user = yield user_model_1.default.findOne({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(res, 404, "User not found", null);
    }
    const food = yield food_model_1.default.findOne({ _id: foodId });
    if (!food) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Food not found", null);
    }
    const newStep = new step_model_1.default({ foodId, step, userId: user._id, username: user.username });
    const savedStep = yield newStep.save();
    food.steps.push(savedStep._id);
    yield food.save();
    return (0, apiResponse_1.apiResponse)(res, 200, "Step created successfully", savedStep);
}));
exports.deleteStep = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const step = yield step_model_1.default.findByIdAndDelete(id);
    if (!step) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Step not found", null);
    }
    yield food_model_1.default.findByIdAndUpdate({ _id: step === null || step === void 0 ? void 0 : step.foodId }, { $pull: { steps: step === null || step === void 0 ? void 0 : step._id } });
    return (0, apiResponse_1.apiResponse)(res, 200, "Step deleted successfully", id);
}));
exports.getAllSteps = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodSteps = yield step_model_1.default.find({});
    if (foodSteps.length === 0) {
        return (0, apiResponse_1.apiResponse)(res, 200, "No steps for this food", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Steps fetched successfully", foodSteps);
}));
