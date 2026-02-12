import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todos";

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
});

const Todo = mongoose.model("Todo", todoSchema);

async function seedData() {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB ✅");

  await Todo.deleteMany({});
  console.log("Cleared existing todos");

  const sampleTodos = [
    { text: "Learn React", done: false },
    { text: "Build a Todo App", done: true },
    { text: "Practice MongoDB", done: false },
    { text: "Deploy to Render", done: false }
  ];

  await Todo.insertMany(sampleTodos);
  console.log("Seeded initial todos 🌱");

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

seedData().catch(console.error);
