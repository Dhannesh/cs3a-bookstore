import express from "express";
import { dbConnect } from "./dbConnect.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log("Server is running...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.use(express.static("public"));

app.use(bookRoute);

app.get("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Page N/A" });
});
