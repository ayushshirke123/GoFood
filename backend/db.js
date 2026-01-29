const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://ayushshirke123_db_user:DVn2AvGoF05P3rkM@cluster0.yy8h13e.mongodb.net/goFood";

const mongoDB = async (callback) => {
  try {
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
