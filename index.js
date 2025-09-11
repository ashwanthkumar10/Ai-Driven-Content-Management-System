import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";

dotenv.config();

// Initialize express app
const app = express();

// Initialize database connection first
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/content", contentRoutes);

const PORT = process.env.PORT || 5000;

// Start server after DB is connected
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
