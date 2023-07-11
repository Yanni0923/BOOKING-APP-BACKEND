import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongoDB');
  } catch (error) {
    throw error;
  }
};

// 如果刪除了該 IP Address，就會跑這段
mongoose.connection.on("disconnected", ()=> {
    console.log('mongoDB disconnected!')
})

// 如果該 IP Address 又恢復了，就會跑這段
mongoose.connection.on("connected", ()=> {
    console.log('mongoDB connected!')
})

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!");
});
