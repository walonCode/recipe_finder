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
exports.getAllVote = exports.getAllUserVote = exports.deleteVote = exports.createVote = void 0;
const apiResponse_1 = require("../helpers/apiResponse");
const errorHandler_1 = require("../helpers/errorHandler");
const asyncHandler_1 = require("../helpers/asyncHandler");
const user_model_1 = __importDefault(require("../models/user.model"));
const food_model_1 = __importDefault(require("../models/food.model"));
const voting_model_1 = __importDefault(require("../models/voting.model"));
const vote_validator_1 = require("../validators/vote.validator");
exports.createVote = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = vote_validator_1.createVoteSchema.safeParse(req.body);
    if (!result.success) {
        return (0, errorHandler_1.errorHandler)(res, 400, "Bad request", result.error);
    }
    const { foodId, voteType } = result.data;
    const food = yield food_model_1.default.findOne({ _id: foodId });
    if (!food) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Food not found", null);
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = yield user_model_1.default.findOne({ _id: userId });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(res, 404, "User not found", null);
    }
    const voting = yield voting_model_1.default.findOne({ foodId, userId });
    if (voting) {
        return (0, errorHandler_1.errorHandler)(res, 409, "You have already voted for this food", null);
    }
    const newVoting = new voting_model_1.default({ foodId, voteType, userId, username: user.username });
    const savedVoting = yield newVoting.save();
    user.votes.push(savedVoting._id);
    yield user.save();
    food.votes.push(savedVoting._id);
    yield food.save();
    return (0, apiResponse_1.apiResponse)(res, 200, "Voting created successfully", savedVoting);
}));
exports.deleteVote = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const voting = yield voting_model_1.default.findByIdAndDelete(id);
    if (!voting) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Voting not found", null);
    }
    yield user_model_1.default.findByIdAndUpdate({ _id: userId }, { $pull: { votes: voting === null || voting === void 0 ? void 0 : voting._id } });
    yield food_model_1.default.findByIdAndUpdate({ _id: voting === null || voting === void 0 ? void 0 : voting.foodId }, { $pull: { votes: voting === null || voting === void 0 ? void 0 : voting._id } });
    return (0, apiResponse_1.apiResponse)(res, 200, "Voting deleted successfully", id);
}));
exports.getAllUserVote = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userVoting = yield voting_model_1.default.find({ userId });
    if (userVoting.length === 0) {
        return (0, apiResponse_1.apiResponse)(res, 200, "No voting for this user", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Voting fetched successfully", userVoting);
}));
exports.getAllVote = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodVoting = yield voting_model_1.default.find({});
    if (foodVoting.length === 0) {
        return (0, apiResponse_1.apiResponse)(res, 200, "No voting for this food", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Voting fetched successfully", foodVoting);
}));
