const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Task = require("../models/Task");
const connectDB = require("../config/db");

// Load env vars
dotenv.config();

const destroyData = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("🗑️  Clearing all data from database...");
    
    // Delete all data
    await User.deleteMany();
    await Task.deleteMany();
    
    console.log("✅ All data cleared successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  }
};

destroyData();
