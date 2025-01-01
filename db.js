const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://0xhenery:4zfl68vFOfzEswzK@cluster0.ypy6z.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0", {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
      connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (error.name === "MongooseServerSelectionError") {
      console.error("Failed to connect to MongoDB. Check your connection string and network settings.");
    }
  }
};

module.exports = { connectDB };