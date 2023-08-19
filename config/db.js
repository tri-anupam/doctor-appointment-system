const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected ${mongoose.connection.host}`);
  } catch (e) {
    console.log(`MongoDB server issue ${e}`);
  }
};

module.exports = connectDB;
