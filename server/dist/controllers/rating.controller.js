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
exports.getAllUserRating = exports.getAllRating = exports.deleteRating = exports.createRating = void 0;
const apiResponse_1 = require("../helpers/apiResponse");
const errorHandler_1 = require("../helpers/errorHandler");
const asyncHandler_1 = require("../helpers/asyncHandler");
const rating_model_1 = __importDefault(require("../models/rating.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const food_model_1 = __importDefault(require("../models/food.model"));
const rating_validator_1 = require("../validators/rating.validator");
exports.createRating = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = rating_validator_1.createRatingSchema.safeParse(req.body);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!result.success) {
        return (0, errorHandler_1.errorHandler)(res, 400, "Bad request", result.error);
    }
    const { foodId, rating } = result.data;
    const user = yield user_model_1.default.findOne({ _id: userId });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(res, 404, "User not found", null);
    }
    const food = yield food_model_1.default.findOne({ _id: foodId });
    if (!food) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Food not found", null);
    }
    const existRating = yield rating_model_1.default.findOne({ foodId, userId });
    if (existRating) {
        return (0, errorHandler_1.errorHandler)(res, 409, "You have already rated this food", null);
    }
    const newRating = new rating_model_1.default({ foodId, rating, userId, username: user.username });
    const savedRating = yield newRating.save();
    user.ratings.push(savedRating._id);
    yield user.save();
    food.ratings.push(savedRating._id);
    yield food.save();
    return (0, apiResponse_1.apiResponse)(res, 200, "Rating created successfully", savedRating);
}));
exports.deleteRating = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const rating = yield rating_model_1.default.findByIdAndDelete(id);
    if (!rating) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Rating not found", null);
    }
    yield user_model_1.default.findByIdAndUpdate({ _id: userId }, { $pull: { ratings: rating === null || rating === void 0 ? void 0 : rating._id } });
    yield food_model_1.default.findByIdAndUpdate({ _id: rating === null || rating === void 0 ? void 0 : rating.foodId }, { $pull: { ratings: rating === null || rating === void 0 ? void 0 : rating._id } });
    return (0, apiResponse_1.apiResponse)(res, 200, "Rating deleted successfully", id);
}));
exports.getAllRating = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodRating = yield rating_model_1.default.find({});
    if (foodRating.length === 0) {
        return (0, apiResponse_1.apiResponse)(res, 200, "No ratings for this food", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Ratings fetched successfully", foodRating);
}));
exports.getAllUserRating = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userRatings = yield rating_model_1.default.find({ userId });
    if (userRatings.length === 0) {
        return (0, apiResponse_1.apiResponse)(res, 200, "No ratings for this user", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Ratings fetched successfully", userRatings);
}));
