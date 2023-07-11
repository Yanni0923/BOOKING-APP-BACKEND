import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouth from "./routes/auth.js";
import hotelsRouth from "./routes/hotels.js";
import roomsRouth from "./routes/rooms.js";
import usersRouth from "./routes/users.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

// 如果刪除了該 IP Address，就會跑這段
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// 如果該 IP Address 又恢復了，就會跑這段
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

//middleware

//一定要加，才可以讀到JSON格式的API Request
app.use(express.json()); // It parses incoming requests with JSON payloads and is based on body-parser.

app.use("/api/auth", authRouth);
app.use("/api/hotels", hotelsRouth);
app.use("/api/rooms", roomsRouth);
app.use("/api/users", usersRouth);

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!");
});
