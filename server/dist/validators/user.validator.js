"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registeUserSchema = exports.loginUserSchema = void 0;
const zod_1 = require("zod");
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(2, "username must be at least 2 characters long"),
    password: zod_1.z.string().min(8, "password must be at least 8 characters long"),
});
exports.registeUserSchema = zod_1.z.object({
    fullname: zod_1.z.string().min(2, "fullname must be at least 2 characters long"),
    username: zod_1.z.string().min(2, "username must be at least 2 characters long"),
    password: zod_1.z.string().min(8, "password must be at least 8 characters long"),
    email: zod_1.z.string().email("please provide a valid email"),
    bio: zod_1.z.string().min(2, "Bio must be at least 2 character long"),
    address: zod_1.z.string().min(2, "Adddress must be at least 2 character long"),
});
