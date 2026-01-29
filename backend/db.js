const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

const mongoDB = async (callback) => {
  try {
    if (!mongoURI) {
      throw new Error("Missing MONGODB_URI environment variable");
    }

    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    const foodCollection = mongoose.connection.db.collection("food_items");
    const categoryCollection = mongoose.connection.db.collection("foodCategory");
    
    const foodData = await foodCollection.find({}).toArray();
    const categoryData = await categoryCollection.find({}).toArray();

    console.log(`📊 Found ${foodData.length} food items and ${categoryData.length} categories`);

    // pass data back
    callback(null, foodData, categoryData);

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    callback(error, null, null);
  }
};

module.exports = mongoDB;
