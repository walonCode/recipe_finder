"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importStar(require("mongoose"));
// ✅ Import models
const user_model_1 = __importDefault(require("../models/user.model"));
const food_model_1 = __importDefault(require("../models/food.model"));
const voting_model_1 = __importDefault(require("../models/voting.model"));
const rating_model_1 = __importDefault(require("../models/rating.model"));
const step_model_1 = __importDefault(require("../models/step.model"));
// ✅ Connect to MongoDB
const mongoURI = "mongodb+srv://mohamedlaminwalonjalloh:zoomspeed@cluster0.llpnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.connect(mongoURI);
// ✅ Fetch existing users
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield user_model_1.default.find({}, "_id username").limit(2).lean();
        if (users.length < 2)
            throw new Error("❌ Not enough users found in the database.");
        return {
            user1: { _id: new mongoose_1.Types.ObjectId(users[0]._id.toString()), username: users[0].username },
            user2: { _id: new mongoose_1.Types.ObjectId(users[1]._id.toString()), username: users[1].username },
        };
    });
}
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        const { user1, user2 } = yield getUsers();
        // ✅ Generate FOOD IDs
        const foodIds = [new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId()];
        // ✅ Generate STEP IDs
        const stepIds = [new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId()];
        // ✅ Generate VOTE IDs
        const voteIds = [new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId()];
        // ✅ Generate RATING IDs
        const ratingIds = [new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId()];
        // ✅ FOOD DATA
        const foodData = [
            { _id: foodIds[0], name: "Jollof Rice", origin: "West Africa", ingredient: ["Rice", "Tomato", "Onion"], steps: [stepIds[0]], votes: [voteIds[0]], ratings: [ratingIds[0]], userId: user1._id, username: user1.username },
            { _id: foodIds[1], name: "Fufu & Soup", origin: "West Africa", ingredient: ["Cassava", "Plantain", "Yam"], steps: [stepIds[1]], votes: [voteIds[1]], ratings: [ratingIds[1]], userId: user1._id, username: user1.username },
            { _id: foodIds[2], name: "Achekeh", origin: "Sierra Leone", ingredient: ["Maggie", "Gari", "Oil"], steps: [stepIds[2]], votes: [voteIds[2]], ratings: [ratingIds[2]], userId: user2._id, username: user2.username },
            { _id: foodIds[3], name: "Beans", origin: "Bo", ingredient: ["Rice", "Seaweed"], steps: [stepIds[3]], votes: [voteIds[3]], ratings: [ratingIds[3]], userId: user2._id, username: user2.username }
        ];
        // ✅ VOTING DATA
        const votingData = [
            { _id: voteIds[0], foodId: foodIds[0], votesType: "like", userId: user1._id, username: user1.username },
            { _id: voteIds[1], foodId: foodIds[1], votesType: "dislike", userId: user1._id, username: user1.username },
            { _id: voteIds[2], foodId: foodIds[2], votesType: "like", userId: user2._id, username: user2.username },
            { _id: voteIds[3], foodId: foodIds[3], votesType: "dislike", userId: user2._id, username: user2.username }
        ];
        // ✅ RATING DATA
        const ratingData = [
            { _id: ratingIds[0], foodId: foodIds[0], rating: 5, userId: user1._id, username: user1.username },
            { _id: ratingIds[1], foodId: foodIds[1], rating: 3, userId: user1._id, username: user1.username },
            { _id: ratingIds[2], foodId: foodIds[2], rating: 4, userId: user2._id, username: user2.username },
            { _id: ratingIds[3], foodId: foodIds[3], rating: 2, userId: user2._id, username: user2.username }
        ];
        // ✅ STEP DATA
        const stepData = [
            { _id: stepIds[0], foodId: foodIds[0], step: ["Boil rice", "Prepare sauce"], userId: user1._id, username: user1.username },
            { _id: stepIds[1], foodId: foodIds[1], step: ["Mash cassava", "Make soup"], userId: user1._id, username: user1.username },
            { _id: stepIds[2], foodId: foodIds[2], step: ["Fry Chicken", "Add Magic"], userId: user2._id, username: user2.username },
            { _id: stepIds[3], foodId: foodIds[3], step: ["Soak beans", "Serve with bread"], userId: user2._id, username: user2.username }
        ];
        // ✅ Insert Data into Collections
        yield food_model_1.default.insertMany(foodData);
        yield voting_model_1.default.insertMany(votingData);
        yield rating_model_1.default.insertMany(ratingData);
        yield step_model_1.default.insertMany(stepData);
        // ✅ Add references to User (linking food, votes, ratings)
        yield user_model_1.default.updateOne({ _id: user1._id }, { $push: { food: { $each: [foodIds[0], foodIds[1]] }, votes: { $each: [voteIds[0], voteIds[1]] }, ratings: { $each: [ratingIds[0], ratingIds[1]] } } });
        yield user_model_1.default.updateOne({ _id: user2._id }, { $push: { food: { $each: [foodIds[2], foodIds[3]] }, votes: { $each: [voteIds[2], voteIds[3]] }, ratings: { $each: [ratingIds[2], ratingIds[3]] } } });
        console.log("✅ Data inserted successfully and users updated!");
    });
}
// ✅ Run the function
insertData()
    .then(() => mongoose_1.default.connection.close())
    .catch(err => console.error("❌ Error:", err));
