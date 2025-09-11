import { PrismaClient } from "@prisma/client";

// Ensure only one instance of PrismaClient is created
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    return prisma;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

export default prisma;
