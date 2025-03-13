"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = require("./allowedOrigins");
const corsOption = {
    origin: (origin, callback) => {
        console.log(`Origin: ${origin}`);
        if (!origin || allowedOrigins_1.allowedOrigin.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'Set-Cookie'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
exports.default = corsOption;
