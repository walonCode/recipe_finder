import mongoose, { Types } from "mongoose";

// ✅ Import models
import User from "../models/user.model";
import Food from "../models/food.model";
import Voting from "../models/voting.model";
import Rating from "../models/rating.model";
import Step from "../models/step.model";

// ✅ Connect to MongoDB
const mongoURI = "mongodb+srv://mohamedlaminwalonjalloh:zoomspeed@cluster0.llpnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI);

// ✅ Define User Type
interface UserType  {
  _id: Types.ObjectId ;
  username: string;
}

// ✅ Fetch existing users
async function getUsers(): Promise<{ user1: UserType; user2: UserType }> {
  const users = await User.find({}, "_id username").limit(2).lean();
  if (users.length < 2) throw new Error("❌ Not enough users found in the database.");
  return {
    user1: { _id: new Types.ObjectId(users[0]._id.toString()), username: users[0].username },
    user2: { _id: new Types.ObjectId(users[1]._id.toString()), username: users[1].username },
  };
}

async function insertData() {
  const { user1, user2 } = await getUsers();

  // ✅ Generate FOOD IDs
  const foodIds = [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()];

  // ✅ Generate STEP IDs
  const stepIds = [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()];

  // ✅ Generate VOTE IDs
  const voteIds = [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()];

  // ✅ Generate RATING IDs
  const ratingIds = [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()];

  // ✅ FOOD DATA
  const foodData = [
    { _id: foodIds[0], name: "Jollof Rice", origin: "West Africa", ingredient: ["Rice", "Tomato","Onion"], steps: [stepIds[0]], votes: [voteIds[0]], ratings: [ratingIds[0]], userId: user1._id, username: user1.username },
    { _id: foodIds[1], name: "Fufu & Soup", origin: "West Africa", ingredient: ["Cassava", "Plantain","Yam"], steps: [stepIds[1]], votes: [voteIds[1]], ratings: [ratingIds[1]], userId: user1._id, username: user1.username },
    { _id: foodIds[2], name: "Achekeh", origin: "Sierra Leone", ingredient: ["Maggie", "Gari","Oil"], steps: [stepIds[2]], votes: [voteIds[2]], ratings: [ratingIds[2]], userId: user2._id, username: user2.username },
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
  await Food.insertMany(foodData);
  await Voting.insertMany(votingData);
  await Rating.insertMany(ratingData);
  await Step.insertMany(stepData);

  // ✅ Add references to User (linking food, votes, ratings)
  await User.updateOne(
    { _id: user1._id },
    { $push: { food: { $each: [foodIds[0], foodIds[1]] }, votes: { $each: [voteIds[0], voteIds[1]] }, ratings: { $each: [ratingIds[0], ratingIds[1]] } } }
  );

  await User.updateOne(
    { _id: user2._id },
    { $push: { food: { $each: [foodIds[2], foodIds[3]] }, votes: { $each: [voteIds[2], voteIds[3]] }, ratings: { $each: [ratingIds[2], ratingIds[3]] } } }
  );

  console.log("✅ Data inserted successfully and users updated!");
}

// ✅ Run the function
insertData()
  .then(() => mongoose.connection.close())
  .catch(err => console.error("❌ Error:", err));
