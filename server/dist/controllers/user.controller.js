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
exports.register = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorHandler_1 = require("../helpers/errorHandler");
const apiResponse_1 = require("../helpers/apiResponse");
const asyncHandler_1 = require("../helpers/asyncHandler");
const user_validator_1 = require("../validators/user.validator");
exports.login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_validator_1.loginUserSchema.safeParse(req.body);
    if (!result.success) {
        return (0, errorHandler_1.errorHandler)(res, 400, "Bad request", result.error);
    }
    const { username, password } = result.data;
    const user = yield user_model_1.default.findOne({ username });
    if (!user) {
        return (0, errorHandler_1.errorHandler)(res, 404, "User not found", null);
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return (0, errorHandler_1.errorHandler)(res, 401, "Unauthorized", null);
    }
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const userResponse = user.toObject();
    delete userResponse.password;
    const userToken = jsonwebtoken_1.default.sign(userResponse, process.env.USER_TOKEN_SECRET, { expiresIn: '1d' });
    return (0, apiResponse_1.apiResponse)(res, 200, "Login successful", { userToken, accessToken });
}));
exports.register = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_validator_1.registeUserSchema.safeParse(req.body);
    if (!result.success) {
        return (0, errorHandler_1.errorHandler)(res, 400, "Bad request", result.error);
    }
    const { fullname, username, password, email, bio, address } = result.data;
    const existingUser = yield user_model_1.default.findOne({ username });
    if (existingUser) {
        return (0, errorHandler_1.errorHandler)(res, 409, "User already exists", null);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new user_model_1.default({ fullname, username, password: hashedPassword, email, bio, address });
    const savedUser = yield newUser.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    return (0, apiResponse_1.apiResponse)(res, 201, "User registered successfully", { userResponse });
}));
