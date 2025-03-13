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
exports.updateFood = exports.getAllUserFoods = exports.getAllFoods = exports.deleteFood = exports.createFood = void 0;
const food_validator_1 = require("../validators/food.validator");
const apiResponse_1 = require("../helpers/apiResponse");
const errorHandler_1 = require("../helpers/errorHandler");
const asyncHandler_1 = require("../helpers/asyncHandler");
const food_model_1 = __importDefault(require("../models/food.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.createFood = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = food_validator_1.createFoodSchema.safeParse(req.body);
    if (!result.success) {
        return (0, errorHandler_1.errorHandler)(res, 400, "Bad request", result.error);
    }
    //get userId from the request header
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { name, origin, ingredient, } = result.data;
    const user = yield user_model_1.default.findOne({ _id: userId });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(res, 404, "User not found", null);
    }
    const food = yield food_model_1.default.findOne({ name });
    if (food) {
        return (0, errorHandler_1.errorHandler)(res, 409, "Food already exists", null);
    }
    const newFood = new food_model_1.default({
        name,
        origin,
        ingredient,
        userId,
        username: user.username
    });
    const savedFood = yield newFood.save();
    user.food.push((savedFood._id));
    yield user.save();
    return (0, apiResponse_1.apiResponse)(res, 201, "Food created successfully", savedFood);
}));
exports.deleteFood = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const food = yield food_model_1.default.findByIdAndDelete(id);
    yield user_model_1.default.findByIdAndUpdate({ userId }, { $pull: { food: food === null || food === void 0 ? void 0 : food._id } });
    if (!food) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Food not found", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Food deleted successfully", id);
}));
exports.getAllFoods = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foods = yield food_model_1.default.find({});
    if (foods.length === 0) {
        return (0, apiResponse_1.apiResponse)(res, 200, "No food added to the database", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Foods fetched successfully", foods);
}));
exports.getAllUserFoods = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userFoods = yield food_model_1.default.find({ userId });
    if (userFoods.length === 0) {
        return (0, apiResponse_1.apiResponse)(res, 200, "No food added to the database", null);
    }
    return (0, apiResponse_1.apiResponse)(res, 200, "Foods fetched successfully", userFoods);
}));
exports.updateFood = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = food_validator_1.updateFoodSchema.safeParse(req.body);
    if (!result.success) {
        return (0, errorHandler_1.errorHandler)(res, 400, "Bad request", result.error);
    }
    const { name, origin, ingredient } = result.data;
    const food = yield food_model_1.default.findById(id);
    if (!food) {
        return (0, errorHandler_1.errorHandler)(res, 404, "Food not found", null);
    }
    food.name = name;
    food.origin = origin;
    food.ingredient = ingredient;
    const updatedFood = yield food.save();
    return (0, apiResponse_1.apiResponse)(res, 200, "Food updated successfully", updatedFood);
}));
