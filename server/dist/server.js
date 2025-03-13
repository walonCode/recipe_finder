"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const connectDB_1 = __importDefault(require("./configs/connectDB"));
const cors_1 = __importDefault(require("cors"));
const corsOption_1 = __importDefault(require("./configs/corsOption"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const user_route_1 = require("./routes/user.route");
const food_route_1 = require("./routes/food.route");
const voting_route_1 = require("./routes/voting.route");
const rating_route_1 = require("./routes/rating.route");
const step_route_1 = require("./routes/step.route");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
(0, connectDB_1.default)();
//common middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption_1.default));
//routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//auth route
app.use('/api/v1/users', user_route_1.userRouter);
//foood route
app.use('/api/v1/foods', food_route_1.foodRouter);
//voting route
app.use('/api/v1/votes', voting_route_1.voteRouter);
//rating route
app.use('/api/v1/ratings', rating_route_1.ratingRouter);
//step route
app.use('/api/v1/steps', step_route_1.stepRouter);
//error middleware
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
