import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", userRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB(); // check DB connection before starting
  console.log(`🚀 Server running on port ${PORT}`);
});
