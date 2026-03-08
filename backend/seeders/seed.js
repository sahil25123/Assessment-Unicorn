const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Task = require("../models/Task");
const connectDB = require("../config/db");

// Load env vars
dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("🗑️  Clearing existing data...");
    // Clear existing data
    await User.deleteMany();
    await Task.deleteMany();
    console.log("✅ Cleared existing data");

    console.log("👥 Creating users...");
    // Create Admin User
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });
    console.log("✅ Created admin user");

    // Create Employee User
    const employee = await User.create({
      name: "Employee User",
      email: "employee@example.com",
      password: "employee123",
      role: "employee",
    });
    console.log("✅ Created employee user");

    // Create additional employees for testing
    const employee2 = await User.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "employee",
    });

    const employee3 = await User.create({
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password123",
      role: "employee",
    });
    console.log("✅ Created additional employees");

    console.log("📋 Creating tasks...");
    // Create sample tasks
    const tasks = [
      {
        title: "Complete Project Documentation",
        description:
          "Write comprehensive documentation for the task management system including API endpoints and user guide.",
        status: "In Progress",
        assignedTo: employee._id,
        assignedBy: admin._id,
      },
      {
        title: "Review Code Changes",
        description:
          "Review the pull request for the authentication module and provide feedback.",
        status: "Pending",
        assignedTo: employee._id,
        assignedBy: admin._id,
      },
      {
        title: "Update Database Schema",
        description:
          "Add new fields to the user model and create migration scripts.",
        status: "Completed",
        assignedTo: employee._id,
        assignedBy: admin._id,
      },
      {
        title: "Fix Login Bug",
        description:
          "Investigate and fix the issue where users are unable to login with special characters in password.",
        status: "In Progress",
        assignedTo: employee2._id,
        assignedBy: admin._id,
      },
      {
        title: "Design Dashboard UI",
        description:
          "Create mockups for the new admin dashboard with analytics and reporting features.",
        status: "Pending",
        assignedTo: employee3._id,
        assignedBy: admin._id,
      },
      {
        title: "Implement Email Notifications",
        description:
          "Set up email notifications for task assignments and status changes.",
        status: "Pending",
        assignedTo: employee2._id,
        assignedBy: admin._id,
      },
      {
        title: "Write Unit Tests",
        description:
          "Add comprehensive unit tests for all controller functions.",
        status: "In Progress",
        assignedTo: employee3._id,
        assignedBy: admin._id,
      },
      {
        title: "Optimize Database Queries",
        description:
          "Improve performance by adding indexes and optimizing MongoDB queries.",
        status: "Completed",
        assignedTo: employee2._id,
        assignedBy: admin._id,
      },
    ];

    await Task.insertMany(tasks);
    console.log("✅ Created sample tasks");

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📝 Demo Credentials:");
    console.log("Admin: admin@example.com / admin123");
    console.log("Employee: employee@example.com / employee123");
    console.log("\nAdditional Employees:");
    console.log("John Doe: john.doe@example.com / password123");
    console.log("Jane Smith: jane.smith@example.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
