import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_RESOURCES_URI =", process.env.MONGODB_RESOURCES_URI); // 👈 check this

async function main() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_RESOURCES_URI);
    console.log(" Connected to MongoDB:", conn.connection.name);
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
}

main();
